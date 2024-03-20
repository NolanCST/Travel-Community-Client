import { useStatus } from "../status/Status";
import "./footer.css";

function Footer() {
  const { status } = useStatus();
  const online = status === 0 || status === 1;
  return (
    <>
      <div className="footer">
        <div className="footerElements">
          <div className="infos">
            <strong>
              <u>Contact :</u>
            </strong>
            <br />
            <br />
            <a href="tel:0493624458">Téléphone: 0493624458</a>
            <br />
            <a href="mailto:community@lebocal.academy">community@lebocal.academy</a>
            <br />
            <a href="https://www.google.com/maps/place/26+Bd+Carabacel,+06000+Nice/@43.7042617,7.2743648,17z/data=!3m1!4b1!4m6!3m5!1s0x12cddaafbc1f660f:0x665cc91f30f6b249!8m2!3d43.7042617!4d7.2743648!16s%2Fg%2F11c1klq5c7?entry=ttu" target="_blank">
              26 boulevard Carabacel 06000 Nice
            </a>
          </div>
          <nav className="links">
            <div className="menu-items">
              <div className="items-list">
                <a href="/">Accueil</a>
                <a href="#">Découvir</a>
                {online ? (
                  <>
                    <a href="/create">Partager un voyage</a>

                    <a href="/profile">Profil</a>
                  </>
                ) : null}
                <a href="#">contact</a>
              </div>
            </div>
          </nav>
        </div>
        <p className="copy">&copy; Nono le plus bô</p>
      </div>
    </>
  );
}

export default Footer;
