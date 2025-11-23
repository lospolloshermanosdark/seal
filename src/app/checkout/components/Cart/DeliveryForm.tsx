"use client";

import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
  useEffect,
  RefObject,
} from "react";

export interface DeliveryFormRef {
  triggerSubmit: () => boolean;
}

interface DeliveryFormProps {
  onContinue: () => void;
  onBack?: () => void;
}

// ------------------ HELPERS / MÁSCARAS / VALIDADORES ------------------

const onlyDigits = (v: string) => v.replace(/\D/g, "");

function maskCPF(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (!d) return "";
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
}

function maskPhone(v: string) {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 10) {
    // (99) 9999-9999
    return d
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\(\d{2}\) \d{4})(\d)/, "$1-$2");
  } else {
    // (99) 9 9999-9999 or (99) 99999-9999 -> prefer (99) 9xxxx-xxxx
    return d
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/^(\(\d{2}\) )(\d)(\d{4})(\d)/, "$1$2 $3-$4")
      .replace(/^(\(\d{2}\) \d{5})(\d)/, "$1-$2");
  }
}

function validarCPF(cpf: string) {
  const s = onlyDigits(cpf);
  if (s.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(s)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += Number(s[i]) * (10 - i);
  let dig1 = (soma * 10) % 11;
  if (dig1 === 10) dig1 = 0;
  if (dig1 !== Number(s[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += Number(s[i]) * (11 - i);
  let dig2 = (soma * 10) % 11;
  if (dig2 === 10) dig2 = 0;
  return dig2 === Number(s[10]);
}

function validarEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validarTelefone(phone: string) {
  const d = onlyDigits(phone);
  return d.length === 10 || d.length === 11;
}

function validarData(d: string, m: string, a: string) {
  if (!d || !m || !a) return false;
  const dia = Number(d);
  const mes = Number(m);
  const ano = Number(a);
  if (!dia || !mes || !ano) return false;
  if (ano < 1900 || ano > new Date().getFullYear()) return false;
  const dt = new Date(ano, mes - 1, dia);
  return (
    dt.getFullYear() === ano &&
    dt.getMonth() === mes - 1 &&
    dt.getDate() === dia
  );
}

// ------------------ COMPONENTE ------------------

const DeliveryForm = forwardRef<DeliveryFormRef, DeliveryFormProps>(
  ({ onContinue }, ref) => {
    // form values (store masked values for UX but validators strip digits)
    const [form, setForm] = useState({
      salutation: "Sra.",
      firstName: "",
      lastName: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
      cep: "",
      address: "",
      number: "",
      city: "",
      country: "Brasil",
      cpf: "",
      phone: "",
      email: "",
    });

    // per-field errors (no global re-rendering for every keystroke)
    const [errors, setErrors] = useState<Record<string, string>>({});

    const errorRef = useRef<HTMLDivElement | null>(null);

    // refs for inputs to implement auto-tab / focus first invalid
    const refs: Record<string, RefObject<HTMLInputElement>> = {
      firstName: useRef<HTMLInputElement>(null),
      lastName: useRef<HTMLInputElement>(null),
      birthDay: useRef<HTMLInputElement>(null),
      birthMonth: useRef<HTMLInputElement>(null),
      birthYear: useRef<HTMLInputElement>(null),
      cep: useRef<HTMLInputElement>(null),
      address: useRef<HTMLInputElement>(null),
      number: useRef<HTMLInputElement>(null),
      city: useRef<HTMLInputElement>(null),
      cpf: useRef<HTMLInputElement>(null),
      phone: useRef<HTMLInputElement>(null),
      email: useRef<HTMLInputElement>(null),
    };

    // helper to set a single field without recreating other data
    const setField = (field: string, value: string) =>
      setForm((prev) => ({ ...prev, [field]: value }));

    // clear a single field error
    const clearError = (field: string) =>
      setErrors((prev) => {
        if (!prev[field]) return prev;
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });

    // focus helper
    const focus = (field: string) => {
      refs[field]?.current?.focus();
    };

    // per-field blur validators (don't validate while user typing)
    const onBlurText = (field: string) => {
      const v = form[field as keyof typeof form]!.toString().trim();

      if (field === "firstName") {
        if (!v) setErrors((p) => ({ ...p, firstName: "Informe seu nome." }));
        else clearError("firstName");
      }

      if (field === "lastName") {
        if (!v)
          setErrors((p) => ({ ...p, lastName: "Informe seu sobrenome." }));
        else clearError("lastName");
      }

      if (field === "cep") {
        const digits = onlyDigits(v);
        if (digits.length !== 8)
          setErrors((p) => ({ ...p, cep: "CEP deve ter 8 dígitos." }));
        else clearError("cep");
      }

      if (field === "address") {
        if (!v) setErrors((p) => ({ ...p, address: "Informe o endereço." }));
        else clearError("address");
      }

      if (field === "number") {
        if (!v) setErrors((p) => ({ ...p, number: "Informe o número." }));
        else clearError("number");
      }

      if (field === "city") {
        if (!v) setErrors((p) => ({ ...p, city: "Informe a cidade." }));
        else clearError("city");
      }

      if (field === "cpf") {
        const digits = onlyDigits(v);

        if (!digits) {
          setErrors((p) => ({ ...p, cpf: "Informe o CPF." }));
          return;
        }

        if (digits.length < 11) {
          setErrors((p) => ({ ...p, cpf: "CPF incompleto." }));
          return;
        }

        // valida usando APENAS dígitos
        if (!validarCPF(digits)) {
          setErrors((p) => ({ ...p, cpf: "CPF inválido." }));
        } else {
          clearError("cpf");
        }
      }


      if (field === "phone") {
        if (!validarTelefone(v))
          setErrors((p) => ({ ...p, phone: "Telefone inválido." }));
        else clearError("phone");
      }

      if (field === "email") {
        if (!validarEmail(v))
          setErrors((p) => ({ ...p, email: "E-mail inválido." }));
        else clearError("email");
      }

      // date handled separately on blur of year (or when all parts filled)
      if (
        field === "birthYear" ||
        field === "birthDay" ||
        field === "birthMonth"
      ) {
        const d = form.birthDay.trim();
        const m = form.birthMonth.trim();
        const y = form.birthYear.trim();

        // only validate when all filled
        if (!d && !m && !y) {
          clearError("birthDay");
          clearError("birthMonth");
          clearError("birthYear");
          return;
        }

        // individual presence checks
        if (!d) setErrors((p) => ({ ...p, birthDay: "Informe o dia." }));
        if (!m) setErrors((p) => ({ ...p, birthMonth: "Informe o mês." }));
        if (!y) setErrors((p) => ({ ...p, birthYear: "Informe o ano." }));

        if (d && m && y) {
          // numeric ranges
          if (Number(d) < 1 || Number(d) > 31)
            setErrors((p) => ({ ...p, birthDay: "Dia inválido." }));
          if (Number(m) < 1 || Number(m) > 12)
            setErrors((p) => ({ ...p, birthMonth: "Mês inválido." }));
          if (y.length !== 4)
            setErrors((p) => ({ ...p, birthYear: "Ano inválido." }));
          // final sanity check
          if (validarData(d, m, y)) {
            clearError("birthDay");
            clearError("birthMonth");
            clearError("birthYear");
          } else {
            setErrors((p) => ({ ...p, birthYear: "Data inválida." }));
          }
        }
      }
    };

    // auto-tab for date and CPF chunks
    const handleAutoTabDate = (
      e: React.ChangeEvent<HTMLInputElement>,
      field: string
    ) => {
      const v = onlyDigits(e.target.value);
      if (field === "birthDay") {
        setField("birthDay", v.slice(0, 2));
        clearError("birthDay");
        if (v.length >= 2) focus("birthMonth");
      }
      if (field === "birthMonth") {
        setField("birthMonth", v.slice(0, 2));
        clearError("birthMonth");
        if (v.length >= 2) focus("birthYear");
      }
      if (field === "birthYear") {
        setField("birthYear", v.slice(0, 4));
        clearError("birthYear");
      }
    };

    // CPF auto-format and optional auto-tab when full
    const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = onlyDigits(e.target.value).slice(0, 11);
      const masked = maskCPF(raw);
      setField("cpf", masked);
      clearError("cpf");
   if (raw.length < 11) {
  setErrors((p) => ({ ...p, cpf: "" })); // remove erro durante digitação
}
    };

    // Phone formatting
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const masked = maskPhone(e.target.value);
      setField("phone", masked);
      clearError("phone");
    };

    // generic onChange for text inputs: clears own error only
    const handleTextChange =
      (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setField(field, e.target.value);
        // clear error for this field silently
        if (errors[field]) clearError(field);
      };

    // ------------------ VALIDATION GLOBAL (triggered by CartSummary) ------------------

    const validateAll = (): boolean => {
      const e: Record<string, string> = {};

      // required text fields
      if (!form.firstName.trim()) e.firstName = "Informe seu nome.";
      if (!form.lastName.trim()) e.lastName = "Informe seu sobrenome.";

      // date: require all parts and check validity
      if (!form.birthDay.trim()) e.birthDay = "Informe o dia.";
      if (!form.birthMonth.trim()) e.birthMonth = "Informe o mês.";
      if (!form.birthYear.trim()) e.birthYear = "Informe o ano.";
      if (form.birthDay && form.birthMonth && form.birthYear) {
        if (!validarData(form.birthDay, form.birthMonth, form.birthYear)) {
          e.birthYear = "Data inválida.";
        }
      }

      // cep
      if (
        !onlyDigits(form.cep || "").length ||
        onlyDigits(form.cep).length !== 8
      )
        e.cep = "CEP inválido.";

      if (!form.address.trim()) e.address = "Informe o endereço.";
      if (!form.number.trim()) e.number = "Informe o número.";
      if (!form.city.trim()) e.city = "Informe a cidade.";

      if (!validarCPF(form.cpf)) e.cpf = "CPF inválido.";
      if (!validarTelefone(form.phone)) e.phone = "Telefone inválido.";
      if (!validarEmail(form.email)) e.email = "E-mail inválido.";

      setErrors(e);

      if (Object.keys(e).length > 0) {
        // focus first invalid field (ordered)
        const order = [
          "firstName",
          "lastName",
          "birthDay",
          "birthMonth",
          "birthYear",
          "cep",
          "address",
          "number",
          "city",
          "cpf",
          "phone",
          "email",
        ];
        for (const f of order) {
          if (e[f]) {
            // scroll into view and focus
            errorRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            setTimeout(() => focus(f), 100);
            break;
          }
        }
        return false;
      }

      return true;
    };

    const submit = () => {
      const ok = validateAll();
      if (ok) {
        localStorage.setItem("customer", JSON.stringify(form)); // ⬅ SALVA CLIENTE
        onContinue();
        return true;
      }
      return false;
    };

    useImperativeHandle(ref, () => ({
      triggerSubmit: submit,
    }));

    // avoid unnecessary rerenders: memoized handlers could be added, but this is enough for a form of this size

    // ------------------ RENDER ------------------

    return (
      <div className="col-xs-12 col-md-8">
        <div className="row card standard-gray-shadow theme-content-bg theme-text-color checkout-card-container">
          <div className="card-content">
            <div className="col-xs-12 card-section">
              <h2 className="inner-card-headline">Preencha Seus Dados</h2>
            </div>

            {/* ALERTA GLOBAL */}
            {Object.keys(errors).length > 0 && (
              <div
                ref={errorRef}
                className="col-xs-12"
                role="alert"
                aria-live="assertive"
                style={{
                  background: "#fdecea",
                  border: "1px solid #e57373",
                  padding: "12px",
                  borderRadius: "6px",
                  marginBottom: "20px",
                  color: "#b71c1c",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <i className="icon icon-warning" aria-hidden />
                Existem erros no formulário. Corrija os campos destacados.
              </div>
            )}

            {/* Saudação */}
            <section className="col-xs-12 card-section">
              <label className="theme-text-variant-color label">Saudação</label>
              <div
                className="radio-group radio-group--with-label form-group"
                style={{ marginBottom: 20 }}
              >
                <div className="styled-checkbox theme-switch-bg theme-switch-border">
                  <input
                    type="radio"
                    id="sra"
                    checked={form.salutation === "Sra."}
                    onChange={() => setField("salutation", "Sra.")}
                    className="radio-input"
                    aria-checked={form.salutation === "Sra."}
                  />
                  <label htmlFor="sra" className="theme-text-color label">
                    Sra.
                  </label>
                </div>

                <div className="styled-checkbox theme-switch-bg theme-switch-border">
                  <input
                    type="radio"
                    id="sr"
                    checked={form.salutation === "Sr."}
                    onChange={() => setField("salutation", "Sr.")}
                    className="radio-input"
                    aria-checked={form.salutation === "Sr."}
                  />
                  <label htmlFor="sr" className="theme-text-color label">
                    Sr.
                  </label>
                </div>
              </div>
            </section>

            {/* Nome / Sobrenome */}
            <section className="col-xs-12 card-section">
              <div className="row form-field-row">
                <div className="col-xs-12 col-sm-6">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      Nome
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.firstName}
                        id="firstName"
                        aria-invalid={!!errors.firstName}
                        aria-describedby={
                          errors.firstName ? "err-firstName" : undefined
                        }
                        className="form-control theme-text-color standard-gray-border"
                        value={form.firstName}
                        onChange={handleTextChange("firstName")}
                        onBlur={() => onBlurText("firstName")}
                        autoComplete="given-name"
                      />
                    </div>
                    {errors.firstName && (
                      <p
                        id="err-firstName"
                        className="field-error-text"
                        style={{ marginTop: 6, color: "#b71c1c" }}
                      >
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xs-12 col-sm-6">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      Sobrenome
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.lastName}
                        id="lastName"
                        aria-invalid={!!errors.lastName}
                        aria-describedby={
                          errors.lastName ? "err-lastName" : undefined
                        }
                        className="form-control theme-text-color standard-gray-border"
                        value={form.lastName}
                        onChange={handleTextChange("lastName")}
                        onBlur={() => onBlurText("lastName")}
                        autoComplete="family-name"
                      />
                    </div>
                    {errors.lastName && (
                      <p
                        id="err-lastName"
                        className="field-error-text"
                        style={{ marginTop: 6 }}
                      >
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Data de nascimento (auto-tab, validação por blur) */}
            <section className="col-xs-12 card-section">
              <label
                className="theme-text-variant-color label"
                style={{ fontWeight: 500 }}
              >
                Data de nascimento
              </label>

              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 6,
                  maxWidth: 280,
                }}
              >
                <input
                  ref={refs.birthDay}
                  id="birthDay"
                  className="form-control standard-gray-border date-input"
                  placeholder="DD"
                  inputMode="numeric"
                  value={form.birthDay}
                  onChange={(e) => handleAutoTabDate(e, "birthDay")}
                  onBlur={() => onBlurText("birthDay")}
                  aria-invalid={!!errors.birthDay}
                  aria-describedby={
                    errors.birthDay ? "err-birthDay" : undefined
                  }
                  style={{ width: 70, textAlign: "center" }}
                />
                <input
                  ref={refs.birthMonth}
                  id="birthMonth"
                  className="form-control standard-gray-border date-input"
                  placeholder="MM"
                  inputMode="numeric"
                  value={form.birthMonth}
                  onChange={(e) => handleAutoTabDate(e, "birthMonth")}
                  onBlur={() => onBlurText("birthMonth")}
                  aria-invalid={!!errors.birthMonth}
                  aria-describedby={
                    errors.birthMonth ? "err-birthMonth" : undefined
                  }
                  style={{ width: 70, textAlign: "center" }}
                />
                <input
                  ref={refs.birthYear}
                  id="birthYear"
                  className="form-control standard-gray-border date-input"
                  placeholder="AAAA"
                  inputMode="numeric"
                  value={form.birthYear}
                  onChange={(e) => handleAutoTabDate(e, "birthYear")}
                  onBlur={() => onBlurText("birthYear")}
                  aria-invalid={!!errors.birthYear}
                  aria-describedby={
                    errors.birthYear ? "err-birthYear" : undefined
                  }
                  style={{ width: 100, textAlign: "center" }}
                />
              </div>

              <div style={{ marginTop: 6 }}>
                {errors.birthDay && (
                  <p id="err-birthDay" className="field-error-text">
                    <i className="icon icon-warning" aria-hidden />{" "}
                    {errors.birthDay}
                  </p>
                )}
                {errors.birthMonth && (
                  <p id="err-birthMonth" className="field-error-text">
                    <i className="icon icon-warning" aria-hidden />{" "}
                    {errors.birthMonth}
                  </p>
                )}
                {errors.birthYear && (
                  <p id="err-birthYear" className="field-error-text">
                    <i className="icon icon-warning" aria-hidden />{" "}
                    {errors.birthYear}
                  </p>
                )}
              </div>
            </section>

            {/* CEP */}
            <section className="col-xs-12 card-section">
              <div className="forms-field" style={{ marginBottom: 18 }}>
                <label
                  className="theme-text-variant-color label"
                  style={{ fontWeight: 500 }}
                >
                  CEP
                </label>
                <div className="form-group">
                  <input
                    ref={refs.cep}
                    id="cep"
                    className="form-control theme-text-color standard-gray-border"
                    value={form.cep}
                    onChange={(e) => {
                      // allow only digits and limit 8
                      const v = onlyDigits(e.target.value).slice(0, 8);
                      setField("cep", v);
                      if (errors.cep) clearError("cep");
                    }}
                    onBlur={() => onBlurText("cep")}
                    inputMode="numeric"
                    aria-invalid={!!errors.cep}
                    aria-describedby={errors.cep ? "err-cep" : undefined}
                  />
                </div>
                {errors.cep && (
                  <p id="err-cep" className="field-error-text">
                    <i className="icon icon-warning" aria-hidden /> {errors.cep}
                  </p>
                )}
              </div>
            </section>

            {/* Endereço / Número / Cidade */}
            <section className="col-xs-12 card-section">
              <div className="row form-field-row">
                <div className="col-xs-12 col-sm-12">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      Endereço (Rua/Avenida)
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.address}
                        id="address"
                        className="form-control theme-text-color standard-gray-border"
                        value={form.address}
                        onChange={handleTextChange("address")}
                        onBlur={() => onBlurText("address")}
                        aria-invalid={!!errors.address}
                        aria-describedby={
                          errors.address ? "err-address" : undefined
                        }
                      />
                    </div>
                    {errors.address && (
                      <p id="err-address" className="field-error-text">
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.address}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      Número
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.number}
                        id="number"
                        className="form-control theme-text-color standard-gray-border"
                        value={form.number}
                        onChange={handleTextChange("number")}
                        onBlur={() => onBlurText("number")}
                        aria-invalid={!!errors.number}
                        aria-describedby={
                          errors.number ? "err-number" : undefined
                        }
                      />
                    </div>
                    {errors.number && (
                      <p id="err-number" className="field-error-text">
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.number}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xs-12 col-sm-8">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      Cidade
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.city}
                        id="city"
                        className="form-control theme-text-color standard-gray-border"
                        value={form.city}
                        onChange={handleTextChange("city")}
                        onBlur={() => onBlurText("city")}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? "err-city" : undefined}
                      />
                    </div>
                    {errors.city && (
                      <p id="err-city" className="field-error-text">
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* País */}
            <section className="col-xs-12 card-section">
              <label
                className="theme-text-variant-color label"
                style={{ fontWeight: 500 }}
              >
                País
              </label>
              <div className="form-group">
                <select
                  className="form-control standard-gray-border"
                  value={form.country}
                  onChange={(e) => setField("country", e.target.value)}
                  aria-label="País"
                >
                  <option>Brasil</option>
                  <option>Outro</option>
                </select>
              </div>
            </section>

            {/* CPF / Telefone / Email */}
            <section className="col-xs-12 card-section">
              <div className="row form-field-row">
                <div className="col-xs-12 col-sm-4">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      CPF
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.cpf}
                        id="cpf"
                        className="form-control theme-text-color standard-gray-border"
                        value={form.cpf}
                        onChange={handleCPFChange}
                        onBlur={() => onBlurText("cpf")}
                        inputMode="numeric"
                        aria-invalid={!!errors.cpf}
                        aria-describedby={errors.cpf ? "err-cpf" : undefined}
                      />
                    </div>
                    {errors.cpf && (
                      <p id="err-cpf" className="field-error-text">
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.cpf}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      Telefone
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.phone}
                        id="phone"
                        className="form-control theme-text-color standard-gray-border"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        onBlur={() => onBlurText("phone")}
                        inputMode="tel"
                        aria-invalid={!!errors.phone}
                        aria-describedby={
                          errors.phone ? "err-phone" : undefined
                        }
                      />
                    </div>
                    {errors.phone && (
                      <p id="err-phone" className="field-error-text">
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <div className="forms-field" style={{ marginBottom: 18 }}>
                    <label
                      className="theme-text-variant-color label"
                      style={{ fontWeight: 500 }}
                    >
                      Email
                    </label>
                    <div className="form-group">
                      <input
                        ref={refs.email}
                        id="email"
                        className="form-control theme-text-color standard-gray-border"
                        value={form.email}
                        onChange={handleTextChange("email")}
                        onBlur={() => onBlurText("email")}
                        inputMode="email"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={
                          errors.email ? "err-email" : undefined
                        }
                      />
                    </div>
                    {errors.email && (
                      <p id="err-email" className="field-error-text">
                        <i className="icon icon-warning" aria-hidden />{" "}
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* NOTE: no internal buttons here — CartSummary triggers submit */}
          </div>
        </div>
      </div>
    );
  }
);

export default DeliveryForm;
