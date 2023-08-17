import { FaWhatsapp, FaExternalLinkAlt } from "react-icons/fa";
import Footer from "../../componentes/Footer";
import Header from "../../componentes/Header";
import bannerImage from "../../img/banner.png";
import ifoodIconImage from "../../img/logo-ifood.png";

const Home = () => {
  const mainContentStyle = {
    marginBottom: "300px",
  };
  return (
    <div className="home-container" style={mainContentStyle}>
      <Header />
      <section className="d-flex flex-column align-items-center">
        <div
          className="sobre"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "25px",
            padding: "20px",
            paddingBottom: "25px",
          }}
        >
          <img
            src={bannerImage}
            alt="banner forno d`veneza"
            className="img-fluid rounded my-5 m-auto d-block"
          />
          <div style={{ textAlign: "center" }}>
            <h1 className="text-center">
              Bem-vindo à Pizzaria Forno D'Veneza!
            </h1>
            <h3 className="m-5 text-center">Sobre nós</h3>
            <p>
              <strong>Somos apaixonados por pizza</strong>. Desde a nossa
              inauguração, temos orgulho de servir a comunidade com as melhores
              e mais deliciosas pizzas da região. Combinando ingredientes
              frescos, técnicas tradicionais de preparo e um toque de
              criatividade, criamos sabores autênticos e memoráveis que
              conquistam até mesmo os paladares mais exigentes.
            </p>
            <p>
              Nós oferecemos serviço de entrega rápida e eficiente, para que
              você possa desfrutar do sabor incrível de nossas pizzas no
              conforto da sua casa. Basta ligar ou fazer seu pedido online, e
              faremos questão de levar até você uma pizza quentinha e
              irresistível.
            </p>
            <p>
              <strong>
                Valorizamos a satisfação de nossos clientes e estamos sempre
                buscando aprimorar nossos serviços
              </strong>
              . Agradecemos sua preferência e esperamos receber seu pedido em
              breve!
            </p>

            <h3 className="m-5 text-center">Onde estamos</h3>
            <div className="mapa d-flex w-100 justify-content-center mb-5">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14658.343762977433!2d-45.963152!3d-23.2944903!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cdcb40317d15b3%3A0xbd0d53e97bfc5108!2sPizzaria%20Forno%20D%20Veneza!5e0!3m2!1spt-BR!2sbr!4v1683994971523!5m2!1spt-BR!2sbr"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="d-flex flex-column my-3">
              <h3 className="m-5 text-center">Faça seu pedido</h3>
              <div className="d-flex justify-content-around">
                <a
                  href="https://api.whatsapp.com/send?phone=5512981537944"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "70px" }}
                >
                  <FaWhatsapp size={30} />
                </a>
                <a
                  href="https://www.ifood.com.br/delivery/jacarei-sp/forno-d-veneza-jardim-santa-maria/689feec4-172b-4898-b85f-e4cf86f4ad41?utm_medium=share"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "10px" }}
                >
                  <img
                    src={ifoodIconImage}
                    alt="icone do ifood"
                    className="ifood-icone"
                    style={{
                      width: "70px",
                      height: "80px",
                      verticalAlign: "middle",
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
