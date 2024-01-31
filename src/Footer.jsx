import WriteZone from "./WriteZone";
import "./Footer.css";
function Footer({  sendMessage }) {
    return (
        <div className="app_footer">
            <WriteZone sendMessage = {sendMessage}></WriteZone>
        </div>
    );
  }
  
  export default Footer;