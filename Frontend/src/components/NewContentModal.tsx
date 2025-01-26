import { Button } from "./Button"
import { CloseIcon } from "./icons/CloseIcon"
import { InputComponent } from "./InputComponent"

interface NewContentModalProps {
    open: boolean;
    onClose: () => void;
}

export const NewContentModal = ({open, onClose}: NewContentModalProps) => {
    return <div>
        {open && <div className="w-screen h-screen bg-gray-700 opacity-75 fixed flex justify-center items-center">
            <div className="bg-white opacity-100 flex flex-col justify-center items-center py-4 px-8 rounded-md">
                <div onClick={onClose}><CloseIcon className={"flex justify-end w-full"} /></div>
                <div>
                    <InputComponent placeholder={'Title'} onChange={()=>console.log('Hi')} />
                    <InputComponent placeholder={'Link'} onChange={()=>console.log('Hi')} />
                </div>   
                <Button variant='primary' size='md' text='Add Content' onClick={()=>console.log('Hi')} />
            </div>    
        </div>}
    </div>

}