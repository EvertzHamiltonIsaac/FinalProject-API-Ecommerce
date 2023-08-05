//? Styles
const message_mail_container = `
color: black;
font-family: Arial, Helvetica, sans-serif;
width: 600px;
border-radius: 5px;
background-color: #EEEEEE;
overflow: hidden;
margin:auto;
`;

const separator = `
width: 100%;
height: 1px;
background-color: #CCCCCC;
`;

const info_container = `
margin: auto;
padding: 15px;
`;

const btn_container = `
background-color: #021e43;
color: white;
padding: 15px;
border-radius: 20px;
width: 40%;
text-align: center;
font-size: large;
font-weight: 600;
margin: auto;
cursor: pointer;
`;

const container = `
display: flex;
justify-content: center;
align-items: center;
`;

const img_settings = `
width: 100%;
text-align: center;
`;

//TODO: HTML

const getHTMLWithURL = (url) => {
  return `
<div style="${container}">
    <div style="${message_mail_container}">
        <div >
            <div style="${img_settings}">
                <img src="https://res.cloudinary.com/dhljwsqha/image/upload/v1691170793/Logo_CL_njeijq.png"/>
            </div>
        </div>
        <div style="${separator}"></div>
        <div style="${info_container}">
            <h3 style="text-align: center; margin-bottom: 10px;">Forgot Password Mail</h3>
            <div style="margin-top: 10px;">Dear Customer: </div>
            <div style="margin-top: 10px; margin-bottom: 20px;">
                You have requested to reset your password and an email
                to
                reset it has been sent to you. Click the button below to
                complete your password reset.
            </div>
            <a style="text-decoration: none; color: white:" href="https://plataformavirtual.itla.edu.do/login/index.php">
                <div style="${btn_container}">
                    Reset Password
                </div>
            </a>
            <div style="margin-top: 20px; margin-bottom: 10px;">
                If the above button does not work, please enter the
                address
                next in your browser.
            </div>
            <div style="width: 100%;">
                <a href style="text-decoration: none;">
                    ${url}
                </a>
            </div>
            <div style="margin-top: 10px; padding-bottom: 10px;">
                This password reset link is only
                valid for 10 minutes after receiving this email
                electronic.
                If you haven't asked us to reset your password, reset it
                now to keep her protected.
            </div>
        </div>
    </div>
</div>
`;
};

module.exports = getHTMLWithURL;
