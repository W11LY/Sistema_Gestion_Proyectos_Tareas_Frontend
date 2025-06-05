type formTask_ProjectProps = {
    titleData?: string;
    descriptionData?: string;
    titleModal: string;
}

export default function FormTask_Project({ titleData, descriptionData, titleModal }: formTask_ProjectProps) {
    return (
        <div>
            <h3 className="text-xl text-white " id="modal-title">{titleModal}</h3>

            <div>
                <div className="block mt-3">
                    <input type="text" name="title" id="title" placeholder="Titulo o Nombre" defaultValue={titleData} className="inputConfig" />
                </div>

                <div className="block mt-3">
                    <textarea name="description" id="description" placeholder="Descripcion" defaultValue={descriptionData} className="inputConfig"></textarea>
                </div>
            </div>
        </div >
    )
}
