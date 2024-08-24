import React from 'react';
import login from '../../api/auth/login';
import { useNavigate } from 'react-router';

export default () => {
    const navigate = useNavigate();

    const submit = () => {
        login()
            .then((data) => {
                console.log('Redirecting user to ' + data);
                // @ts-expect-error this is fine.
                window.location = data;
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div onClick={submit}>Click to Login via Discord</div>
    );
};
