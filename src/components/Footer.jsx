const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3>ShopHub</h3>

                <p>
                    Product Listing Application
                </p>

                <p>
                    © {new Date().getFullYear()} Abhin
                    All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;