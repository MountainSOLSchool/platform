import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';

export interface ReactAuthProps {}

export function LoginForm() {
    return (
        // login form using primereact

        <div style={{ width: '500px' }}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="username">Username</label>
                    <InputText id="username" type="text" />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Password</label>
                    <Password id="password" feedback={false} />
                </div>
                <Button label="Login" />
            </div>
        </div>
    );
}

export default LoginForm;
