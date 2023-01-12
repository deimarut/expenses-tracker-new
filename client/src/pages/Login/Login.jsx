import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../../components/Button/Button";
import { Form } from "../../components/Form/Form";
import { Input } from "../../components/Input/Input";

const LoginContainer = styled.div`
    align-items: center;
    background-color: lightgrey;
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const LinkStyled = styled(Link)`
    align-self: center;
`;

const FormStyled = styled(Form)`
    max-width: 100%;
    padding: 20px;
    width: 400px;
`;

export const Login = ({ onSuccess }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name, 
                password
            })
        })
        .then((res) => {
            if (res.status === 401) {
                throw new Error('Incorrect username or password');
            }

            if (!res.ok) {
                throw new Error('Something went wrong');
            }

            return res.json();
        })
        .then((data) => {
            onSuccess(data);
            setIsLoading(false);
            setError('');
        })
        .catch((e) => {
            setError(e.message);
            setIsLoading(false);
        })
    }

    return (
        <LoginContainer>
            <FormStyled onSubmit={handleLogin} disabled={isLoading} column>
                <h1>Expenses tracker</h1>
                <Input 
                    placeholder="Name" 
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />
                <Input 
                    placeholder="Password" 
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                {error && <div>{error}</div>}
                <Button>Login</Button>
                <LinkStyled to="/register">Register</LinkStyled>
            </FormStyled>
        </LoginContainer>
    );
}