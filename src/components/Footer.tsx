export function Footer() {
    const html = `
<svg width="0" height="0" style="position:absolute"><symbol viewBox="0 0 48 32" id="icon-flag-AT" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M0 0h48v11H0zm0 21h48v11H0z"></path><path fill="#FFF" d="M0 11h48v10H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-BE" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h16v32H0z"></path><path fill="#FDDA25" d="M16 0h16v32H16z"></path><path fill="#EF3340" d="M32 0h16v32H32z"></path></symbol><symbol viewBox="0 0 48 32" id="icon-flag-BG" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v11H0z"></path><path fill="#1AAF5D" d="M0 11h48v10H0z"></path><path fill="#E94B35" d="M0 21h48v11H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-BR" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#1AAF5D" d="M0 0h48v32H0z"></path><path fill="#F2C500" d="M24 2 4 16l20 14 20-14L24 2z"></path><path fill="#227FBB" d="M33 16a9 9 0 1 0-18 0 9 9 0 0 0 18 0z"></path><path fill="#FFF" d="M32.94 17.045a8.95 8.95 0 0 1-.367 1.701 17.691 17.691 0 0 0-12.33-4.982c-1.78 0-3.5.262-5.12.75.096-.58.248-1.142.45-1.68a19.317 19.317 0 0 1 4.67-.57 19.18 19.18 0 0 1 12.697 4.781z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-CA" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v32H0z"></path><path fill="#E94B35" d="M0 0h9v32H0zM39 0h9v32h-9zM23.75 6l-1.703 3.167c-.194.344-.54.312-.886.12l-1.233-.636.919 4.864c.193.889-.427.889-.733.505l-2.151-2.402-.35 1.22c-.04.16-.217.328-.483.288l-2.72-.57.714 2.59c.153.577.273.815-.154.967l-.97.455 4.684 3.793a.61.61 0 0 1 .213.636l-.41 1.34c1.612-.184 3.057-.463 4.67-.635.143-.015.382.22.38.384L23.325 27h.784l-.123-4.904c-.001-.164.215-.41.357-.394 1.614.172 3.059.45 4.671.636l-.41-1.341a.61.61 0 0 1 .213-.636l4.684-3.793-.97-.455c-.427-.152-.307-.39-.154-.967l.714-2.59-2.72.57c-.266.04-.443-.128-.483-.288l-.35-1.22-2.151 2.402c-.306.384-.926.384-.733-.505l.919-4.864-1.233.636c-.346.192-.692.224-.886-.12L23.75 6Z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-CH" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M0 0h48v32H0z"></path><path fill="#FFF" d="M21 7h6v18h-6z"></path><path fill="#FFF" d="M15 13h18v6H15z"></path></g></symbol><symbol viewBox="0 0 48 48" id="icon-flag-CH_rect" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M0 0h48v48H0z"></path><path fill="#FFF" d="M21 15h6v18h-6z"></path><path fill="#FFF" d="M15 21h18v6H15z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-CU" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v32H0z"></path><path fill="#227FBB" d="M0 26h48v6H0zm0-13h48v6H0zM0 0h48v6H0z"></path><path fill="#E94B35" d="M24 16 0 32V0z"></path><path fill="#FFF" d="m7 18.36-3.09 2.15L5 16.908l-3-2.274 3.764-.077L7 11l1.236 3.556 3.764.077-3 2.274 1.09 3.604z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-CZ" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M0 16h48v16H0z"></path><path fill="#FFF" d="M0 0h48v16H0z"></path><path fill="#227FBB" d="m0 0 24 16L0 32z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-DE" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#000" d="M0 0h48v11H0z"></path><path fill="#E94B35" d="M0 11h48v10H0z"></path><path fill="#F2C500" d="M0 21h48v11H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-DK" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M0 0h48v32H0z"></path><path fill="#FFF" d="M0 13h48v6H0z"></path><path fill="#FFF" d="M13 0h6v32h-6z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-ES" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#F2C500" d="M0 0h48v32H0z"></path><path fill="#E94B35" d="M0 0h48v8H0zm0 24h48v8H0z"></path><g transform="translate(4 9)"><path fill="#D9D9D9" d="M3 3.5V13h.5v1h-3v-1H1V3.5z"></path><circle cx="2" cy="3.5" fill="#E94B35" r="1"></circle><g transform="translate(3.5 3)"><path fill="#D9D9D9" d="M.458.41h10.084v7.12c0 2.457-2.258 3.56-5.042 3.56S.458 9.986.458 7.53V.41z"></path><path fill="#E94B35" d="M.917.821H5.5v4.107H.917z"></path><path fill="#F2C500" d="M.917 4.929H5.5v2.636a2.292 2.292 0 0 1-4.583 0V4.93z"></path><path fill="#E94B35" d="M5.5 4.929h4.583v2.636a2.292 2.292 0 0 1-4.583 0V4.93z"></path><ellipse cx="7.792" cy="2.875" fill="#E94B35" rx="1.375" ry="1.643"></ellipse></g><path fill="#D9D9D9" d="M17 3.5V13h.5v1h-3v-1h.5V3.5z"></path><circle cx="16" cy="3.5" fill="#E94B35" r="1"></circle><ellipse cx="9" cy="1.5" fill="#E94B35" rx="4" ry="1.5"></ellipse></g></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-FI" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v32H0z"></path><path fill="#227FBB" d="M13 0h6v32h-6z"></path><path fill="#227FBB" d="M48 13v6H0v-6z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-FR" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#00267F" d="M0 0h16v32H0z"></path><path fill="#FFF" d="M16 0h16v32H16z"></path><path fill="#F31830" d="M32 0h16v32H32z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-GB" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#227FBB" d="M0 0h48v32H0z"></path><path fill="#FFF" fill-rule="nonzero" d="M5.408 0 48 28.394V32h-5.408L0 3.606V0z"></path><path fill="#FFF" fill-rule="nonzero" d="M5.408 32 48 3.606V0h-5.408L0 28.394V32z"></path><path fill="#E94B35" fill-rule="nonzero" d="M0 0v2.404L20.394 16H24zm24 16v-2.404L44.394 0H48zm24 16v-2.404L27.606 16H24zM0 32l24-16v2.404L3.606 32z"></path><path fill="#FFF" d="M29 11h19v10H29v11H19V21H0V11h19V0h10v11z"></path><path fill="#E94B35" d="M27 13h21v6H27v13h-6V19H0v-6h21V0h6v13z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-HR" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 10h48v12H0z"></path><path fill="#227FBB" d="M0 22h48v10H0z"></path><path fill="#E94B35" d="M0 0h48v10H0z"></path><path fill="#FFF" d="M31.917 18.633V9.998H16.083v8.635c0 3.975 3.563 7.227 7.917 7.227 4.354 0 7.917-3.252 7.917-7.227z"></path><path fill="#E94B35" d="M22.417 9.998h3.166v3.172h-3.166V9.998h-4.75 1.583v3.172h-3.167V9.998h1.584zm6.333 0h3.167v3.172H28.75V9.998zm-12.608 9.517a6.598 6.598 0 0 1-.059-.882v-2.29h3.167v3.172h-3.108zm9.441 6.199a8.602 8.602 0 0 1-3.166 0v-3.026h3.166v3.026zm-8.127-3.026h1.794v1.717a7.658 7.658 0 0 1-1.794-1.717zm13.088 0a7.658 7.658 0 0 1-1.794 1.717v-1.717h1.794zm1.373-6.345v2.29c0 .299-.02.593-.06.882H28.75v-3.172h3.167zM19.25 13.17h3.167v3.173H19.25V13.17zm6.333 0h3.167v3.173h-3.167V13.17zm-3.166 3.173h3.166v3.172h-3.166v-3.172zm-3.167 3.172h3.167v3.173H19.25v-3.173zm6.333 0h3.167v3.173h-3.167v-3.173z"></path><path fill="#2C97DE" d="m33.5 6.169-1.414-2.077-2.342.789-1.645-1.711-2.167 1.13L24 2.86 22.068 4.3l-2.167-1.13-1.645 1.71-2.342-.789L14.5 6.17l1.583 3.829S18.798 8.554 24 8.554c5.203 0 7.917 1.443 7.917 1.443L33.5 6.169z"></path><path fill="#E94B35" d="m29.226 7.186 3.414 1.106-.307.736-3.265-1.07z"></path><path fill="#227FBB" d="m28.868 9.027.876-4.146-1.645-1.711-2.167 1.13-.361 4.3c1.293.075 2.394.238 3.297.427zm-6.413-.429L22.068 4.3l-2.167-1.13-1.645 1.71 1.026 4.116c.88-.177 1.94-.327 3.173-.398z"></path><path fill="#F2C500" d="M24 7.698c.348-.002.543-.395.543-.76h-.09l.18-.32-.362.145L24 6.429l-.271.334-.362-.145.18.32h-.09c0 .365.195.762.543.76zm-.95-1.983c.348-.002.543-.395.543-.76h-.09l.18-.32-.362.145-.271-.334-.271.334-.362-.145.18.32h-.09c0 .365.195.762.543.76zm1.9 0c.348-.002.543-.395.543-.76h-.09l.18-.32-.362.145-.271-.334-.271.334-.362-.145.18.32h-.09c0 .365.195.762.543.76z"></path><path fill="#E94B35" d="M26.927 5.469c.057-.065.062-.051.095-.065a.338.338 0 0 1 .143-.05c.05-.01.1-.01.15-.005a.234.234 0 0 1 .12.047l.104.067c.037.026.073.05.11.07a.392.392 0 0 0 .236.03c.022-.007.035.01.011.027-.176.13-.31.01-.425-.045a.903.903 0 0 1 .11.112.618.618 0 0 0 .178.159.37.37 0 0 0 .265.052c.015-.003.02-.001.021.008 0 .007-.001.02-.01.027a.218.218 0 0 1-.135.048.446.446 0 0 1-.271-.092c-.07-.048-.116-.106-.17-.158a.366.366 0 0 0-.155-.095.65.65 0 0 0-.244.013 1.157 1.157 0 0 0-.196-.098.62.62 0 0 1 .063-.052z"></path><path fill="#F2C500" d="m27.595 7.45-.04.093a.08.08 0 0 1-.064.048l-.08.01a.08.08 0 0 1-.067-.025l-.023-.024a.054.054 0 0 1 .015-.087l.166-.084a.08.08 0 0 0 .031-.029l.139-.221a.08.08 0 0 0-.068-.123h-.257a.08.08 0 0 0-.032.007l-.164.073a.08.08 0 0 0-.042.044l-.18.458a.08.08 0 0 1-.042.043l-.026.012a.08.08 0 0 1-.077-.006l-.022-.015a.053.053 0 0 1-.005-.084l.076-.064a.08.08 0 0 0 .026-.045l.094-.438a.035.035 0 0 0-.043-.04l-.018.004a.08.08 0 0 0-.053.048l-.097.249a.08.08 0 0 1-.006.013l-.068.11a.08.08 0 0 1-.099.031l-.04-.016a.052.052 0 0 1-.008-.093l.062-.04a.08.08 0 0 0 .032-.04l.112-.308a.08.08 0 0 0-.003-.063l-.08-.159a.08.08 0 0 1-.007-.052l.089-.43a.08.08 0 0 0-.007-.052l-.035-.07a.08.08 0 0 1 0-.07l.034-.073a.055.055 0 0 0-.06-.077l-.054.01a.08.08 0 0 1-.082-.033l-.013-.02a.08.08 0 0 1 .006-.097l.126-.145a.08.08 0 0 0 .017-.033l.01-.037a.08.08 0 0 1 .06-.058l.182-.04a.08.08 0 0 1 .044.003l.338.123a.05.05 0 0 1 .002.092l-.1.04a.08.08 0 0 1-.04.005l-.035-.004a.035.035 0 0 0-.038.045l.104.312a.08.08 0 0 0 .055.051l1.072.293a.08.08 0 0 0 .036.001l.402-.077a.047.047 0 0 1 .05.025.034.034 0 0 1-.016.046l-.072.032a.08.08 0 0 0-.044.051l-.018.062a.08.08 0 0 1-.039.049l-.11.06a.08.08 0 0 0-.042.066l-.01.25a.08.08 0 0 1-.006.025l-.113.302a.08.08 0 0 1-.023.033l-.377.32a.08.08 0 0 0-.023.032l-.032.084a.08.08 0 0 1-.093.05l-.008-.002a.051.051 0 0 1-.03-.081l.045-.06a.08.08 0 0 0 .01-.02l.106-.286a.066.066 0 0 0-.106-.073l-.183.161a.08.08 0 0 0-.02.029z"></path><path fill="#FFF" d="M17.44 8.837c-.58.21-1.234-.105-1.523-.712.38.34.898.472 1.372.3.474-.173.786-.607.86-1.112.168.65-.13 1.313-.71 1.524z"></path><path fill="#F2C500" d="m16.285 5.187.42.38.526-.187.025-.009-.005.026-.106.568.419.38.019.017-.025.009-.525.188-.108.567-.005.027-.02-.018-.419-.38-.526.188-.025.008.006-.026.106-.567-.419-.38-.02-.018.025-.009.526-.188.107-.567.005-.026zm15.584.068.048.563.512.223.024.01-.022.016-.464.342.047.564.002.026-.024-.01-.513-.221-.465.341-.022.016-.002-.026-.048-.564-.512-.222-.024-.01.022-.016.464-.342-.047-.564-.002-.026.024.01.513.22.465-.34.022-.016z"></path><path fill="#E94B35" d="m18.433 5.587 3.692-.652.072.793-3.572.63zm.378 1.52 3.455-.61.071.792-3.333.589z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-HU" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#1AAF5D" d="M0 21h48v11H0z"></path><path fill="#FFF" d="M0 11h48v10H0z"></path><path fill="#E94B35" d="M0 0h48v11H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-IL" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v32H0z"></path><path fill="#2C97DE" d="M0 2h48v3H0zm0 25h48v3H0z"></path><g fill="#2C97DE" fill-rule="nonzero"><path d="M18.35 19.543h11.3L24 9.535l-5.65 10.008zM24 7.08l7.728 13.69H16.272L24 7.08z"></path><path d="M18.35 12.398 24 22.406l5.65-10.008h-11.3zm13.378-1.227L24 24.86l-7.728-13.69h15.456z"></path></g></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-IT" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M16 0h16v32H16z"></path><path fill="#E94B35" d="M32 0h16v32H32z"></path><path fill="#1AAF5D" d="M0 0h16v32H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-NL" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 11h48v10H0z"></path><path fill="#E94B35" d="M0 0h48v11H0z"></path><path fill="#227FBB" d="M0 21h48v11H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-NO" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M0 0h48v32H0z"></path><path fill="#FFF" d="M48 11v10H0V11z"></path><path fill="#FFF" d="M11 0h10v32H11z"></path><path fill="#227FBB" d="M48 13v6H0v-6z"></path><path fill="#227FBB" d="M13 0h6v32h-6z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-PL" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M0 16h48v16H0z"></path><path fill="#FFF" d="M0 0h48v16H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-RO" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#E94B35" d="M32 0h16v32H32z"></path><path fill="#F2C500" d="M16 0h16v32H16z"></path><path fill="#227FBB" d="M0 0h16v32H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-RS" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 22h48v10H0z"></path><path fill="#227FBB" d="M0 10h48v12H0z"></path><path fill="#E94B35" d="M0 0h48v10H0z"></path><g transform="translate(8 2)"><path fill="#E94B35" d="M0 7.857h13V18.5a6.5 6.5 0 1 1-13 0V7.857z"></path><path fill="#F2C500" d="m10.111 20.714.722 1.429-.722 1.428-.722-1.428zm-7.222 0 .722 1.429-.722 1.428-.722-1.428z"></path><path fill="#FFF" d="M9.064 23.929c.166-.673-1.36-4.462-1.179-4.374 1.888.913 3.918.77 4.678.867-.324-1.46.528-5.76.145-8.696-.306-2.346-1.575-2.947-2.06-2.633.882 1.586-.702 2.943-1.418 3.731-1.316-.9-1.196-1.805-.998-2.145 1.157.261 1.607-.266 1.783-.812.26-.81-.95-1.055-1.39-1.013-1.023.097-1.732.955-2.125 2.575-.397-1.62-1.105-2.478-2.128-2.575-.44-.042-1.65.202-1.39 1.013.176.546.626 1.073 1.783.812.198.34.318 1.245-.998 2.145-.716-.788-2.3-2.145-1.417-3.731-.486-.314-1.755.287-2.06 2.633-.384 2.936.468 7.236.144 8.696.76-.097 2.79.046 4.678-.867.18-.088-1.345 3.701-1.18 4.374.824.378 1.68.566 2.568.563.753-.003 1.608-.19 2.564-.563z"></path><path fill="#E94B35" d="M3.611 12.857H9.39v3.54a2.889 2.889 0 1 1-5.778 0v-3.54z"></path><path fill="#FFF" d="M7.006 15.214h3.105v1H7.006V20H5.994v-3.786H2.89v-1h3.105v-3.071h1.012v3.071z"></path><path fill="#F2C500" d="M6.5 0c.2 0 .361.16.361.357v.714a.36.36 0 0 1-.361.358.36.36 0 0 1-.361-.358V.357A.36.36 0 0 1 6.5 0z"></path><path fill="#FFF" fill-rule="nonzero" d="m2.14 5.582-.445-1.103a.71.71 0 0 1 .211-.816c1.24-1.012 2.767-1.519 4.594-1.52 1.828-.001 3.354.505 4.595 1.52a.71.71 0 0 1 .21.815l-.446 1.104a.356.356 0 0 0 .201.464.362.362 0 0 0 .47-.2l.446-1.102a1.418 1.418 0 0 0-.42-1.632C10.18 1.988 8.49 1.427 6.5 1.43c-1.99.001-3.68.562-5.054 1.683a1.418 1.418 0 0 0-.422 1.633l.446 1.102a.362.362 0 0 0 .47.199.356.356 0 0 0 .2-.464z"></path><path fill="#FFF" fill-rule="nonzero" d="M9.368 2.67c.554.352.489 1.143-.359 2.5a.355.355 0 0 0 .118.491c.17.104.392.052.497-.116 1.028-1.645 1.127-2.846.134-3.476a.364.364 0 0 0-.5.108.355.355 0 0 0 .11.493zm-5.735 0c-.555.352-.49 1.143.358 2.5a.355.355 0 0 1-.117.491.363.363 0 0 1-.497-.116C2.349 3.9 2.25 2.699 3.243 2.069a.364.364 0 0 1 .499.108.355.355 0 0 1-.11.493zm2.506-.884v3.571a.36.36 0 0 0 .361.357c.2 0 .361-.16.361-.357V1.786a.36.36 0 0 0-.361-.357.36.36 0 0 0-.361.357z"></path><circle cx="6.5" cy="1.429" fill="#F2C500" r="1"></circle><path fill="#F2C500" d="m2.167 7.143-.723-1.429c1.6-.481 3.286-.72 5.056-.716a17.82 17.82 0 0 1 5.056.716l-.723 1.429v.714H2.167v-.714z"></path></g></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-RU" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v10H0z"></path><path fill="#227FBB" d="M0 10h48v12H0z"></path><path fill="#E94B35" d="M0 22h48v10H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-SE" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#227FBB" d="M0 0h48v32H0z"></path><path fill="#F2C500" d="M12 0h6v32h-6z"></path><path fill="#F2C500" d="M0 13h48v6H0z"></path></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-SI" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v10H0z"></path><path fill="#227FBB" d="M0 10h48v12H0z"></path><path fill="#E94B35" d="M0 22h48v10H0z"></path><g fill-rule="nonzero"><path fill="#E94B35" d="m18.386 13.321.512-7.71a14.459 14.459 0 0 0-12.614 0l.512 7.71c.23 3.465 2.538 6.423 5.795 7.427 3.257-1.004 5.565-3.962 5.795-7.427"></path><path fill="#227FBB" d="M7.25 13.29c.214 3.22 2.33 5.982 5.34 6.97 3.012-.988 5.128-3.75 5.342-6.97l.523-7.885C18.522 5.438 15.811 4 12.591 4 9.4 4 6.647 5.443 6.727 5.405l.523 7.885z"></path><path fill="#FFF" d="M7.86 14.366c.55 2.519 2.34 4.566 4.73 5.405 2.391-.84 4.183-2.886 4.731-5.405l-2.365-3.219-.946 1.288-1.42-2.897-1.418 2.897-.946-1.288-2.365 3.219"></path><path fill="#227FBB" d="M8.072 15.17c.21.37.554.64.957.75.404.11.835.053 1.197-.16a1.55 1.55 0 0 1 1.577 0 1.55 1.55 0 0 0 1.576 0 1.55 1.55 0 0 1 1.577 0c.362.213.793.27 1.196.16.404-.11.749-.38.958-.75v.465c-.21.37-.554.64-.958.75-.403.11-.834.052-1.196-.161a1.55 1.55 0 0 0-1.577 0 1.55 1.55 0 0 1-1.576 0 1.55 1.55 0 0 0-1.577 0 1.549 1.549 0 0 1-1.197.16 1.581 1.581 0 0 1-.957-.749v-.465z"></path><path fill="#227FBB" d="M8.072 16.1c.21.37.554.639.957.75.404.11.835.052 1.197-.161a1.55 1.55 0 0 1 1.577 0 1.55 1.55 0 0 0 1.576 0 1.55 1.55 0 0 1 1.577 0c.362.213.793.27 1.196.16.404-.11.749-.38.958-.75v.465c-.21.37-.554.64-.958.75-.403.11-.834.053-1.196-.16a1.55 1.55 0 0 0-1.577 0 1.55 1.55 0 0 1-1.576 0 1.55 1.55 0 0 0-1.577 0 1.549 1.549 0 0 1-1.197.16 1.581 1.581 0 0 1-.957-.75V16.1z"></path><path fill="#F2C500" d="m12.59 7.325.12.395.393-.093-.276.302.276.302-.394-.093-.118.394-.118-.394-.394.093.275-.302-.275-.302.394.093zm-1.773-2.413.118.394.394-.093-.275.302.275.302-.394-.093-.118.395-.118-.395-.394.093.276-.302-.276-.302.394.093zm3.548 0 .118.394.394-.093-.276.302.276.302-.394-.093-.118.395-.119-.395-.393.093.275-.302-.275-.302.393.093z"></path></g></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-SK" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0h48v10H0z"></path><path fill="#227FBB" d="M0 10h48v12H0z"></path><path fill="#E94B35" d="M0 22h48v10H0z"></path><g fill-rule="nonzero"><path fill="#FFF" d="M13.236 25.758c-3.163-1.546-7.686-4.615-7.686-10.685s.286-8.831.286-8.831h14.8s.286 2.76.286 8.83c0 6.071-4.524 9.14-7.686 10.686z"></path><path fill="#E94B35" d="M13.236 24.953c-2.901-1.419-7.051-4.234-7.051-9.804 0-5.569.262-8.102.262-8.102h13.578s.262 2.533.262 8.102c0 5.57-4.15 8.385-7.051 9.804z"></path><path fill="#FFF" d="M17.54 13.27s-.037.496-.037 1.073c0 .578.036 1.073.036 1.073-1.252-.425-2.797-.434-3.683-.422v3.076h-1.24v-3.076c-.886-.012-2.432-.003-3.684.422 0 0 .037-.495.037-1.073 0-.577-.037-1.073-.037-1.073 1.365.463 2.898.432 3.683.42v-1.933c-.716-.006-1.747.029-2.914.425 0 0 .036-.496.036-1.073 0-.578-.036-1.074-.036-1.074 1.165.396 2.195.431 2.911.425-.037-1.223-.388-2.765-.388-2.765s.723.057 1.012.057c.289 0 1.011-.057 1.011-.057s-.35 1.542-.388 2.765c.716.006 1.747-.029 2.912-.425 0 0-.036.496-.036 1.074 0 .577.036 1.073.036 1.073-1.167-.396-2.199-.431-2.915-.425v1.932c.786.013 2.319.044 3.683-.42z"></path><path fill="#227FBB" d="M13.236 17.736c-1.462 0-2.244 2.058-2.244 2.058s-.434-.976-1.626-.976c-.807 0-1.401.728-1.779 1.403 1.467 2.37 3.808 3.832 5.648 4.732 1.84-.9 4.183-2.362 5.65-4.732-.377-.675-.971-1.403-1.778-1.403-1.192 0-1.628.976-1.628.976s-.782-2.058-2.244-2.058z"></path></g></g></symbol><symbol viewBox="0 0 48 32" id="icon-flag-US" xmlns="http://www.w3.org/2000/svg"><g fill-rule="evenodd"><path fill="#fff" d="M0 0h48v32H0z"></path><path d="M24 0h24v2.5H24zm0 9.833h24v2.5H24zM0 19.667v2.5h48v-2.5zm24-14.75h24v2.5H24zm0 9.833v2.5h24v-2.5zM0 24.583h48v2.5H0zM0 29.5h48V32H0z" fill="#e94b35"></path><path fill="#227fbb" d="M0 0h24v17.25H0z"></path><g fill="#fff"><path d="m2 3-.588.309.112-.655-.476-.464.657-.095L2 1.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L6 1.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L10 1.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L14 1.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L18 1.5l.294.595.657.095-.476.464.112.655z"></path><path d="m18 3-.588.309.112-.655-.476-.464.657-.095L18 1.5l.294.595.657.095-.476.464.112.655zm2 3-.588.309.112-.655-.476-.464.657-.095L20 4.5l.294.595.657.095-.476.464.112.655zM4 6l-.588.309.112-.655-.476-.464.657-.095L4 4.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L8 4.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L12 4.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L16 4.5l.294.595.657.095-.476.464.112.655zm6-3-.588.309.112-.655-.476-.464.657-.095L22 1.5l.294.595.657.095-.476.464.112.655zM2 9l-.588.309.112-.655-.476-.464.657-.095L2 7.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L6 7.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L10 7.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L14 7.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L18 7.5l.294.595.657.095-.476.464.112.655z"></path><path d="m18 9-.588.309.112-.655-.476-.464.657-.095L18 7.5l.294.595.657.095-.476.464.112.655zm2 3-.588.309.112-.655-.476-.464.657-.095L20 10.5l.294.595.657.095-.476.464.112.655zM4 12l-.588.309.112-.655-.476-.464.657-.095L4 10.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L8 10.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L12 10.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L16 10.5l.294.595.657.095-.476.464.112.655zm6-3-.588.309.112-.655-.476-.464.657-.095L22 7.5l.294.595.657.095-.476.464.112.655zM2 15l-.588.309.112-.655-.476-.464.657-.095L2 13.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L6 13.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L10 13.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L14 13.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L18 13.5l.294.595.657.095-.476.464.112.655z"></path><path d="m18 15-.588.309.112-.655-.476-.464.657-.095L18 13.5l.294.595.657.095-.476.464.112.655zm4 0-.588.309.112-.655-.476-.464.657-.095L22 13.5l.294.595.657.095-.476.464.112.655z"></path></g></g></symbol></svg>
<div class="container">
<div class="footerfull-accordion info-accordion full-width visible-xs js-accordion">
<ul class="footerfull-linklist info-accordion-section theme-element-border js-accordion-slide" role="presentation">
<li class="footerfull-linklist-item info-accordion-item js-accordion-trigger" aria-expanded="false" role="button" tabindex="0" data-qa="triggerAccordion">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<h2 class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Sobre a EVENTIM
</h2>
<div class="info-accordion-icon">
<i class="icon icon-expand-less"></i>
</div>
</div>
</div>
</li>
<li style="display: none;">
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/imprint/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Quem Somos" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Quem Somos&quot;}">Quem Somos</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/terms/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Termos e Condições Gerais" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Termos e Condições Gerais&quot;}">Termos e Condições Gerais</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/campaign/eventimnomundo" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Eventim No Mundo" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Eventim No Mundo&quot;}">Eventim No Mundo</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/data-protection/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Política de Privacidade" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Política de Privacidade&quot;}">Política de Privacidade</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/help/accessibility/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Acessibilidade" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Acessibilidade&quot;}">Acessibilidade</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border js-accordion-slide" role="presentation">
<li class="footerfull-linklist-item info-accordion-item js-accordion-trigger" aria-expanded="false" role="button" tabindex="0" data-qa="triggerAccordion">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<h2 class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Serviço ao Cliente
</h2>
<div class="info-accordion-icon">
<i class="icon icon-expand-less"></i>
</div>
</div>
</div>
</li>
<li style="display: none;">
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Atendimento ao cliente" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Atendimento ao cliente&quot;}">Atendimento ao cliente</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/4413851605015--Bilheterias-Endere%C3%A7os-e-hor%C3%A1rios" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Pontos de Venda e Retirada" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Pontos de Venda e Retirada&quot;}">Pontos de Venda e Retirada</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/4409720864279-Formas-de-pagamento" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Formas de Pagamento" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Formas de Pagamento&quot;}">Formas de Pagamento</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/categories/4409831535895-Meia-Entrada" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Meia-Entrada" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Meia-Entrada&quot;}">Meia-Entrada</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/35034809648023-F%C3%B3rmula-1-2025-Retirada-na-bilheteria" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Retirada de Ingressos por Terceiros" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Retirada de Ingressos por Terceiros&quot;}">Retirada de Ingressos por Terceiros</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border js-accordion-slide" role="presentation">
<li class="footerfull-linklist-item info-accordion-item js-accordion-trigger" aria-expanded="false" role="button" tabindex="0" data-qa="triggerAccordion">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<h2 class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Mais EVENTIM
</h2>
<div class="info-accordion-icon">
<i class="icon icon-expand-less"></i>
</div>
</div>
</div>
</li>
<li style="display: none;">
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/campaign/newsletter/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Newsletter" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Newsletter&quot;}">Newsletter</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/sitemap/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Mapa do Site" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Mapa do Site&quot;}">Mapa do Site</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="js-consent-settings optanon-toggle-display link theme-interaction-color js-tracking-delegate js-track-delegate" href="#cmpbox" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Definição de Privacidade" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Definição de Privacidade&quot;}">Definição de Privacidade</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/22161459063831-Assessoria-de-imprensa" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Assuntos de Imprensa" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Assuntos de Imprensa&quot;}">Assuntos de Imprensa</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border js-accordion-slide" role="presentation">
<li class="footerfull-linklist-item info-accordion-item js-accordion-trigger" aria-expanded="false" role="button" tabindex="0" data-qa="triggerAccordion">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<h2 class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Eventim.PASS
</h2>
<div class="info-accordion-icon">
<i class="icon icon-expand-less"></i>
</div>
</div>
</div>
</li>
<li style="display: none;">
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/campaign/eventimpass" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="O que é" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;O que é&quot;}">O que é</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/20955026425751-Informa%C3%A7%C3%B5es-sobre-o-Eventim-Pass-Ingresso-no-aplicativo" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Perguntas Frequentes" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Perguntas Frequentes&quot;}">Perguntas Frequentes</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border js-accordion-slide" role="presentation">
<li class="footerfull-linklist-item info-accordion-item js-accordion-trigger" aria-expanded="false" role="button" tabindex="0" data-qa="triggerAccordion">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<h2 class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Seguro Ingresso Protegido Premium
</h2>
<div class="info-accordion-icon">
<i class="icon icon-expand-less"></i>
</div>
</div>
</div>
</li>
<li style="display: none;">
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/18606565531543-Sobre-o-Seguro-Ingresso-Protegido" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Mais informações" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Mais informações&quot;}">Mais informações</a>
</li>
</ul>
</li>
</ul>
</div>
<div class="footerfull-accordion info-accordion full-width hidden-xs">
<ul class="footerfull-linklist info-accordion-section theme-element-border">
<li class="footerfull-linklist-item info-accordion-item">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Sobre a EVENTIM
</div>
</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/imprint/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Quem Somos" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Quem Somos&quot;}">Quem Somos</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/terms/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Termos e Condições Gerais" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Termos e Condições Gerais&quot;}">Termos e Condições Gerais</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/campaign/eventimnomundo" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Eventim No Mundo" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Eventim No Mundo&quot;}">Eventim No Mundo</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/data-protection/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Política de Privacidade" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Política de Privacidade&quot;}">Política de Privacidade</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/help/accessibility/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Acessibilidade" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Acessibilidade&quot;}">Acessibilidade</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border">
<li class="footerfull-linklist-item info-accordion-item">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Serviço ao Cliente
</div>
</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Atendimento ao cliente" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Atendimento ao cliente&quot;}">Atendimento ao cliente</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/4413851605015--Bilheterias-Endere%C3%A7os-e-hor%C3%A1rios" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Pontos de Venda e Retirada" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Pontos de Venda e Retirada&quot;}">Pontos de Venda e Retirada</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/4409720864279-Formas-de-pagamento" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Formas de Pagamento" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Formas de Pagamento&quot;}">Formas de Pagamento</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/categories/4409831535895-Meia-Entrada" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Meia-Entrada" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Meia-Entrada&quot;}">Meia-Entrada</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/35034809648023-F%C3%B3rmula-1-2025-Retirada-na-bilheteria" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Retirada de Ingressos por Terceiros" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Retirada de Ingressos por Terceiros&quot;}">Retirada de Ingressos por Terceiros</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border">
<li class="footerfull-linklist-item info-accordion-item">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Mais EVENTIM
</div>
</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/campaign/newsletter/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Newsletter" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Newsletter&quot;}">Newsletter</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="/help/sitemap/" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Mapa do Site" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Mapa do Site&quot;}">Mapa do Site</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="js-consent-settings optanon-toggle-display link theme-interaction-color js-tracking-delegate js-track-delegate" href="#cmpbox" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Definição de Privacidade" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Definição de Privacidade&quot;}">Definição de Privacidade</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/22161459063831-Assessoria-de-imprensa" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Assuntos de Imprensa" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Assuntos de Imprensa&quot;}">Assuntos de Imprensa</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border">
<li class="footerfull-linklist-item info-accordion-item">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Eventim.PASS
</div>
</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.eventim.com.br/campaign/eventimpass" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="O que é" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;O que é&quot;}">O que é</a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/20955026425751-Informa%C3%A7%C3%B5es-sobre-o-Eventim-Pass-Ingresso-no-aplicativo" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Perguntas Frequentes" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Perguntas Frequentes&quot;}">Perguntas Frequentes</a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist info-accordion-section theme-element-border">
<li class="footerfull-linklist-item info-accordion-item">
<div class="footerfull-linklist-item-name info-accordion-name">
<div class="u-flex u-flex-justify-between">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Seguro Ingresso Protegido Premium
</div>
</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content info-accordion-content" style="display: block;">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://help.eventim.com.br/hc/pt-br/articles/18606565531543-Sobre-o-Seguro-Ingresso-Protegido" data-tracking-category="navigation" data-tracking-action="footer_links" data-tracking-label="Mais informações" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;link&quot;,&quot;navigation_element_selected&quot;:&quot;Mais informações&quot;}">Mais informações</a>
</li>
</ul>
</li>
</ul>
</div>
</div>
<div class="container">
<div class="footerfull-mid-section full-width">
<div class="footerfull-secondary">
<ul class="footerfull-linklist">
<li class="footerfull-linklist-item">
<div class="footerfull-linklist-item-name">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Social Media
</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content footerfull-icon-container arrange">
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="http://www.facebook.com/EventimBrasil" data-tracking-category="navigation" data-tracking-action="footer_icons" data-tracking-label="facebook2" aria-label="Facebook" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;icon&quot;,&quot;navigation_element_selected&quot;:&quot;facebook2&quot;}"><i class="icon icon-sharing icon-facebook2 u-no-link-style" aria-hidden="true"></i></a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.tiktok.com/@eventimbrasil" data-tracking-category="navigation" data-tracking-action="footer_icons" data-tracking-label="tiktok" aria-label="TikTok" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;icon&quot;,&quot;navigation_element_selected&quot;:&quot;tiktok&quot;}"><i class="icon icon-sharing icon-tiktok u-no-link-style" aria-hidden="true"></i></a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.instagram.com/eventimbrasil/" data-tracking-category="navigation" data-tracking-action="footer_icons" data-tracking-label="instagram" aria-label="Instagram" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;icon&quot;,&quot;navigation_element_selected&quot;:&quot;instagram&quot;}"><i class="icon icon-sharing icon-instagram u-no-link-style" aria-hidden="true"></i></a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://www.linkedin.com/company/eventimbrasil/" data-tracking-category="navigation" data-tracking-action="footer_icons" data-tracking-label="linkedin" aria-label="LinkedIn" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;icon&quot;,&quot;navigation_element_selected&quot;:&quot;linkedin&quot;}"><i class="icon icon-sharing icon-linkedin u-no-link-style" aria-hidden="true"></i></a>
</li>
<li class="footerfull-linklist-content-item">
<a class="link theme-interaction-color js-tracking-delegate js-track-delegate" href="https://open.spotify.com/user/9jtsakw2czpjk7uyxy9zozsa2" data-tracking-category="navigation" data-tracking-action="footer_icons" data-tracking-label="spotify" aria-label="Spotify" target="_blank" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;,&quot;navigation_subcategory&quot;:&quot;icon&quot;,&quot;navigation_element_selected&quot;:&quot;spotify&quot;}"><i class="icon icon-sharing icon-spotify u-no-link-style" aria-hidden="true"></i></a>
</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist">
<li class="footerfull-linklist-item">
<div class="footerfull-linklist-item-name">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">
Download App
</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content footerfull-icon-container arrange">
<li class="footerfull-linklist-content-item">
<a href="https://itunes.apple.com/br/app/eventim-brasil/id1187371599" target="_blank"><img src="https://www.eventim.com.br/campaign/fileadmin/landingpages/gfx/badges/appleappstore/pt.svg" class="link-variant theme-text-variant-color" alt="App Store" style="height:31px;"></a>
</li>
<li class="footerfull-linklist-content-item">
<a href="https://play.google.com/store/apps/details?id=br.com.eventim.mobile.app.Android" target="_blank"><img src="https://www.eventim.com.br/campaign/fileadmin/landingpages/gfx/badges/googleplay/pt.png" class="link-variant theme-text-variant-color" alt="Google Play" style="height:31px;"></a>
</li>
<li class="footerfull-linklist-content-item">
<div id="armored_website" style="width: 115px; height: 32px;"><a href="https://auditoria.siteblindado.com/consumidor/selo-blindado/?language1=pt&amp;hostname=www.eventim.com.br" id="sb-shield-2" target="_blank" referrerpolicy="origin" rel="noopener" aria-label="Verificar" title="Navegue tranquilamente! Este é um Site Blindado contra ataques! Clique e confira mais detalhes."> <img src="https://seal.app.convisoappsec.com/seals/domain/www.eventim.com.br/seal.svg" rel="noopener nofollow " alt="site blindado" oncontextmenu="alert(&quot;Cópia&nbsp;Proibida&nbsp;por&nbsp;Lei&nbsp;-&nbsp;Site&nbsp;Blindado®&nbsp;é&nbsp;marca&nbsp;registrada&nbsp;de&nbsp;Site&nbsp;Blindado&nbsp;S.A.&quot;)&quot;"></a></div>
<script type="text/javascript" src="//cdn.siteblindado.com/aw.js"></script>

</li>
</ul>
</li>
</ul>
<ul class="footerfull-linklist">
<li class="footerfull-linklist-item">
<div class="footerfull-linklist-item-name">
<div class="footerfull-linklist-headline headline3 no-margin theme-headline-color">

</div>
</div>
</li>
<li>
<ul class="footerfull-linklist-content no-margin-top">
</ul>
</li>
</ul>
</div>
</div>
</div>
<div class="footerfull-end-section js-country">
<div class="container u-position-relative">
<div class="footerfull-tertiary">
<ul class="footerfull-linklist">
<li class="footerfull-linklist-item footerfull-logo-container">
<img src="/obj/media/BR-eventim/specialLogos/checkoutApp/logo_01_new.svg" width="67" height="36" alt="EVENTIM">
</li>
</ul>
<div class="footerfull-linklist" role="presentation">
<div class="footerfull-linklist-content">
<a href="/dashboard/" class="link-transparent js-track" data-track-name="navigation" data-track-params="{&quot;navigation_category&quot;:&quot;footer&quot;, &quot;navigation_subcategory&quot;:&quot;link&quot;, &quot;navigation_element_selected&quot;:&quot;Login&quot;}">Login</a>
</div>
<div class="footerfull-linklist-content link-transparent" aria-hidden="true">
<span>&nbsp;|&nbsp;</span>
</div>
<div class="footerfull-linklist-content u-flex js-footer-switch-trigger" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-controls="countryLanguageSwitchFlyout" aria-label="Country and language selection Brasil Português">
<span id="footerCountryFlag" class="u-cursor-pointer" title="Brasil">
<svg class="country-switch-flag" width="21" height="14" aria-hidden="true">
<use xlink:href="#icon-flag-BR"></use>
</svg>
</span>
<span class="link-transparent" title="Português">
PT
</span>
</div>
<nav id="countryLanguageSwitchFlyout" class="country-switch-content js-footer-switch-content" hidden="">
<div class="flyout-container">
<div class="flyout-content">
<div class="flyout-element">
<ul class="country-switch simple-list" role="listbox" aria-label="Country selection: List of international branches and subsidiaries">
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Alemanha" href="https://www.eventim.de">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-DE"></use>
</svg>
Alemanha
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Áustria" href="https://www.oeticket.com">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-AT"></use>
</svg>
Áustria
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Belgium" href="https://www.eventim.be/">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-BE"></use>
</svg>
Belgium
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Brazil" href="https://www.eventim.com.br">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-BR"></use>
</svg>
Brazil
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Bulgária" href="https://www.eventim.bg">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-BG"></use>
</svg>
Bulgária
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Canada" href="https://www.eventim.ca">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-CA"></use>
</svg>
Canada
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Croácia" href="https://www.eventim.hr">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-HR"></use>
</svg>
Croácia
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Cuba" href="https://cuba.entradas.com/">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-CU"></use>
</svg>
Cuba
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Dinamarca" href="https://www.billetlugen.dk/">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-DK"></use>
</svg>
Dinamarca
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Eslováquia" href="https://www.eventim.sk">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-SK"></use>
</svg>
Eslováquia
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Eslovênia" href="https://www.eventim.si">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-SI"></use>
</svg>
Eslovênia
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Espanha" href="https://www.entradas.com">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-ES"></use>
</svg>
Espanha
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Finlândia" href="https://www.lippu.fi">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-FI"></use>
</svg>
Finlândia
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="França" href="https://www.eventim.fr">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-FR"></use>
</svg>
França
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Holanda" href="https://www.eventim.nl">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-NL"></use>
</svg>
Holanda
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Hungria" href="https://www.eventim.hu">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-HU"></use>
</svg>
Hungria
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Israel" href="https://www.eventim.co.il">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-IL"></use>
</svg>
Israel
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Itália" href="https://www.ticketone.it">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-IT"></use>
</svg>
Itália
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Noruega" href="https://www.eventim.no">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-NO"></use>
</svg>
Noruega
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Polônia" href="https://www.eventim.pl">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-PL"></use>
</svg>
Polônia
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Reino Unido" href="https://www.eventim.co.uk">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-GB"></use>
</svg>
Reino Unido
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Romênia" href="https://www.eventim.ro">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-RO"></use>
</svg>
Romênia
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Suécia" href="https://www.eventim.se">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-SE"></use>
</svg>
Suécia
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="Suíça" href="https://www.ticketcorner.ch">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-CH"></use>
</svg>
Suíça
</a>
</li>
<li class="country-switch-item" role="none">
<a class="country-switch-item-link link link-disguise theme-link-color" role="option" target="_blank" title="United States" href="https://www.eventim.com">
<svg class="country-switch-flag" width="24" height="16" aria-hidden="true">
<use xlink:href="#icon-flag-US"></use>
</svg>
United States
</a>
</li>
</ul>
</div>
<div class="flyout-element" data-qa="flyout-language-list">
<div class="flyout-radio-list searchheader-language-switch simple-list js-language-switch" role="radiogroup" aria-label="Language switch">
<button class="searchheader-language-switch-item u-no-btn-style fullwidth text-left styled-checkbox theme-switch-bg theme-switch-border js-language-switch-item" disabled="" aria-current="page" aria-checked="true" role="radio" type="button" data-qa="language-pt" data-language="pt" data-url="/artist/seal/">
<span class="radio-input" data-checked=""></span>
<span class="label font-size-m searchheader-language-switch-label">Português</span>
</button>
<button class="searchheader-language-switch-item u-no-btn-style fullwidth text-left styled-checkbox theme-switch-bg theme-switch-border js-language-switch-item" aria-checked="false" role="radio" type="button" data-qa="language-en" data-language="en" data-url="/en/artist/seal/">
<span class="radio-input"></span>
<span class="label font-size-m searchheader-language-switch-label">English</span>
</button>
<button class="searchheader-language-switch-item u-no-btn-style fullwidth text-left styled-checkbox theme-switch-bg theme-switch-border js-language-switch-item" aria-checked="false" role="radio" type="button" data-qa="language-es" data-language="es" data-url="/es/artist/seal/">
<span class="radio-input"></span>
<span class="label font-size-m searchheader-language-switch-label">Español</span>
</button>
</div>
</div>
</div>
</div>
</nav>
</div>
</div>
</div>
</div>
    `;
    return (
        <>
            <footer  data-c="footerfull" id="footer" className="c c-full-grey c-inner no-padding-bottom footerfull " data-qa="footerfull-component"  dangerouslySetInnerHTML={{ __html: html }}></footer>
        </>
    );
}