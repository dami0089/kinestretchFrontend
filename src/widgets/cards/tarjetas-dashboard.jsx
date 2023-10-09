import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function TarjetasDash({ color, title, value, footer }) {
  return (
    <Card className="flex h-96 flex-col justify-between">
      <CardBody className="flex flex-col items-center justify-center p-6">
        <Typography
          variant="small"
          className="mb-2 font-bold text-blue-gray-600"
        >
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Typography className="text-3xl">{footer}</Typography>
        </CardFooter>
      )}
    </Card>
  );
}

TarjetasDash.defaultProps = {
  color: "blue",
  footer: null,
};

TarjetasDash.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

TarjetasDash.displayName = "/src/widgets/cards/statistics-card.jsx";

export default TarjetasDash;
