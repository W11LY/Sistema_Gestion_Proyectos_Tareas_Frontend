"use client"

type formProfileProps = {
    getClient?: typeClientRequest;
    type: "create" | "update";
    getStateUpdate?: boolean;
}

export default function FormProfile({ getClient, type, getStateUpdate }: formProfileProps) {
    return (
        <div className={`grid grid-cols-1 gap-6 mt-8 ${type == "create" && "md:grid-cols-2"}`}>
            <div>
                <input type="text" placeholder="Nombres" name="names" id="names" className="inputConfig" defaultValue={getClient?.names} disabled={!getStateUpdate && type == "update"} />
            </div>

            <div>
                <input type="text" placeholder="Apellidos" name="lastnames" id="lastnames" className="inputConfig" defaultValue={getClient?.lastnames} disabled={!getStateUpdate && type == "update"} />
            </div>

            <div>
                <input type="text" placeholder="Numero Telefonico" name="phone" id="phone" className="inputConfig" defaultValue={getClient?.phone} disabled={!getStateUpdate && type == "update"} />
            </div>

            <div>
                <input type="email" placeholder="Correo Electronico" name="email" id="email" className="inputConfig" defaultValue={getClient?.email} disabled={!getStateUpdate && type == "update"} />
            </div>

            {type == "create" && (
                <>
                    <div>
                        <label htmlFor="password1" className="labelConfig"></label>
                        <input type="password" placeholder="Contraseña" name="password1" id="password1" className="inputConfig"/>
                    </div>

                    <div>
                        <label htmlFor="password2" className="labelConfig"></label>
                        <input type="password" placeholder="Confirmar Contraseña" name="password2" id="password2" className="inputConfig"/>
                    </div>
                </>
            )}
        </div>
    )
}
