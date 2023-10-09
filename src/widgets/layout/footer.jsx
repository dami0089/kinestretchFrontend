import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

export function Footer({ brandName, brandLink, routes }) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year} Hecho por{" "}
          <a
            href={brandLink}
            target="_blank"
            className="transition-colors hover:text-blue-500"
          >
            {brandName}
          </a>{" "}
        </Typography>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  brandName: "Kinestretch",
  brandLink: "https://www.instagram.com/kinestretch/",
  routes: [
    // { name: "Inicio", path: "https://www.creative-tim.com" },
    // {
    //   name: "Quienes Somos",
    //   path: "https://www.creative-tim.com/presentation",
    // },
    // { name: "Planes", path: "https://www.creative-tim.com/blog" },
    // { name: "Contacto", path: "https://www.creative-tim.com/license" },
  ],
};

Footer.propTypes = {
  brandName: PropTypes.string,
  brandLink: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
