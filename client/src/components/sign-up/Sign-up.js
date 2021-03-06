import React, {useState} from 'react';
import "./Sign-up.css";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {SignInAction, SignUpAction} from "../../actions/user";
import homeImage from "../../assets/home-image.jpeg";
import crossIcon from "../../assets/close-window-icon.svg";
import Redirect from "../redirect/redirect";

const SignUp = () => {
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();

    const {formState: {errors, isValid}, handleSubmit, reset, getValues, register} = useForm({
        mode: 'all'
    });

    const onSubmit = (formData) => {
        SignUpAction(formData?.email, formData?.password)
            .then(response => {
                if (response) {
                    reset();
                    setRedirect(true);
                    dispatch(SignInAction(formData?.email, formData?.password));
                }
            });
    }

    const handleInputError = (nodeId) => {
        const node = document.getElementById(nodeId);
        if (node) {
            node.className = "input input-error";
        }
    }

    const handleInputValid = (nodeId) => {
        const node = document.getElementById(nodeId);
        if (node) {
            node.className = "input";
        }
    }

    return (
        <div className={"sign-up"}>
            <img src={homeImage} alt={"Cloud Storage home page"} id={"background-img"}/>
            <div className="sign-up-container shadow scale-up-ver-center">
                <div className={"sign-up-container-header"}>
                    <Link to={"../"} className={"close-icon-link"} replace={true}>
                        <img src={crossIcon} className={"close-icon"} alt={"Close window"}/>
                    </Link>
                </div>

                <div className={"sign-up-header"}>Sign Up</div>

                <form autoComplete={"off"} className={"sign-up-form"} onSubmit={handleSubmit(onSubmit)}>

                    <input id="email" type={"text"} placeholder={"Enter your email"} className={"input"}
                           {...register("email", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty",
                               },
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}])|(([a-zA-Z\-\d]+\.)+[a-zA-Z]{2,}))$/,
                                   message: "Invalid email"
                               }
                           })}
                    />
                    {errors?.email ? handleInputError("email") : handleInputValid("email")}

                    <div className={'input-error-container'}>
                        {errors?.email &&
                            <small className="input-error">{errors?.email?.message}</small>
                        }
                    </div>

                    <input id="password" type={"password"} placeholder={"Enter your password"} className={"input"}
                           {...register("password", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty"
                               },
                               minLength: {
                                   value: 6,
                                   message: "Password must be longer than 5"
                               },
                               maxLength: {
                                   value: 16,
                                   message: "Password must be shorter than 16",
                               },
                           })}
                    />
                    {errors?.password ? handleInputError("password") : handleInputValid("password")}


                    <div className={'input-error-container'}>
                        {errors?.password &&
                            <small className="input-error">{errors?.password?.message}</small>
                        }
                    </div>

                    <input id="repeatPassword" type={"password"} placeholder={"Repeat your password"}
                           className={"input"}
                           {...register("repeatPassword", {
                               required: {
                                   value: true,
                                   message: "This field cannot be empty",
                               },
                               minLength: {
                                   value: 6,
                                   message: "Password must be longer than 5"
                               },
                               maxLength: {
                                   value: 16,
                                   message: "Password must be shorter than 16",
                               },
                               validate: {
                                   isMatch: (value) => {
                                       return value === getValues("password") || "Passwords do not match"
                                   }
                               }
                           })}
                    />
                    {errors?.repeatPassword ? handleInputError("repeatPassword") : handleInputValid("repeatPassword")}


                    <div className={'input-error-container'}>
                        {errors?.repeatPassword &&
                            <small className="input-error">{errors?.repeatPassword?.message}</small>
                        }
                    </div>

                    <button type="submit" className={"btn shadow sign-up-btn"} disabled={!isValid}>Sign Up</button>
                    {/*{redirect &&
                        <Redirect to={"../sign-up-success"} replace={true}/>
                    }*/}
                </form>
            </div>
        </div>
    );
};

export default SignUp;
