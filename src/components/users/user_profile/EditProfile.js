import { useEffect, useState } from "react"
import "./EditProfile.css"
import { editUser } from "../../../services/userService"
import { useNavigate } from "react-router-dom"

export const EditProfile = ({ currentUser }) => {
    const [userInfo, setUserInfo] = useState({})

    const navigate = useNavigate()

    useEffect(() => {
        setUserInfo({
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            cohort: currentUser.cohort,
            email: currentUser.email,
            pictureUrl: currentUser.pictureUrl
        })
    }, [])

    return (
        <div className="edit-profile-container">
            <header>
                <h1>Edit Profile</h1>
            </header>
            
            <section className="edit-profile">
                <div className="edit-profile-picture">
                    <img src={userInfo?.pictureUrl}></img>
                </div>

                <form>
                    <fieldset className="edit-fieldset">
                        <div className="edit-input">
                            <div>First Name:</div>
                            <input
                                type="text"
                                id="firstName"
                                value={userInfo.firstName}
                                className="edit-form-input"
                                required
                                autoFocus
                                onChange={(change) => {
                                    const copy = {...userInfo}
                                    copy.firstName = change.target.value
                                    setUserInfo(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="edit-fieldset">
                        <div className="edit-input">
                            <div>Last Name:</div>
                            <input
                                type="text"
                                id="lastName"
                                value={userInfo.lastName}
                                className="edit-form-input"
                                required
                                autoFocus
                                onChange={(change) => {
                                    const copy = { ...userInfo }
                                    copy.lastName = change.target.value
                                    setUserInfo(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="edit-fieldset">
                        <div className="edit-input">
                            <div>Email:</div>
                            <input
                                type="email"
                                id="email"
                                value={userInfo.email}
                                className="edit-form-input"
                                required
                                onChange={(change) => {
                                    const copy = { ...userInfo }
                                    copy.email = change.target.value
                                    setUserInfo(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="edit-fieldset">
                        <div className="edit-input">
                            <div>Cohort #:</div>
                            <input
                                type="number"
                                id="cohort"
                                value={userInfo.cohort}
                                className="edit-form-input"
                                required
                                onChange={(change) => {
                                    const copy = { ...userInfo }
                                    copy.cohort = change.target.value
                                    setUserInfo(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                    <fieldset className="edit-fieldset">
                        <div className="edit-input">
                            <div>Picture Url:</div>
                            <input
                                type="text"
                                id="pictureUrl"
                                value={userInfo.pictureUrl}
                                className="edit-form-input"
                                required
                                onChange={(change) => {
                                    const copy = { ...userInfo }
                                    copy.pictureUrl = change.target.value
                                    setUserInfo(copy)
                                }}
                            />
                        </div>
                    </fieldset>
                </form>
            </section>

            <footer>
                <button type="submit" onClick={() => {
                    editUser(userInfo, currentUser.id).then(() => {
                        navigate(`/user_profile/${currentUser.id}`)
                    })
                }}>Save</button>
            </footer>
        </div>
    )
}