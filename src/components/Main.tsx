export function Main({
    children,
}: {
    children: React.ReactNode;
}) {

    return (

        <main id="main" className="main-content">

            {children}
        </main>
    )
}