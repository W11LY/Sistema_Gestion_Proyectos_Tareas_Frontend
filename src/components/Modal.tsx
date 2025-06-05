type modalProps = {
    modalId: string;
    children: React.ReactNode;
};

export default function Modal({ modalId, children }: modalProps) {
    return (
        <>
            <input type="checkbox" id={modalId} className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box bg-segundo">
                    {children}
                </div>
                <label className="modal-backdrop" htmlFor={modalId}>
                    Close
                </label>
            </div>
        </>
    );
}
