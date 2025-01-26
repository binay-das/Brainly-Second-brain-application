import { Button } from "../components/ui/Button"
import { InputComponent } from "../components/ui/InputComponent"

export const SignIn = () => {
    return <div className="w-screen h-screen">
        <InputComponent placeholder='username' />
        <InputComponent placeholder='password' />
        <Button variant="secondary" text="Sign In" size="lg" />
    </div>
}