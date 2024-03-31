import { WizardForm } from "../components/wizard-form/WizardForm";

const ComprarTicket = () => {
    return (
        <>
            <div id="comprar-ticket" className="w-100 vh-100 py-5 d-flex justify-content-start align-items-center flex-column"
                style={{
                    backgroundImage: `url('/media/popcorn.svg')`,
                    backgroundRepeat: 'repeat-y',
                    backgroundPosition: 'right center',
                }}
            >
                <div className="container my-5">
                    <div className="row">
                        <h2 className="fw-medium">Comprar ticket</h2>
                        <small className="text-white">Seleccione una funcion</small>
                    </div>
                </div>
                <div className="mt-lg-5 container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-md-8 col-lg-6">
                            <WizardForm />
                        </div>
                    </div>
                </div>
                <div id="bucket" className="position-absolute bottom-0 w-100 d-none d-md-block" style={{
                    backgroundImage: `url('/media/bucket.svg')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left bottom',
                    height: '570px'
                }}></div>
            </div>
        </>
    );
};

export { ComprarTicket };