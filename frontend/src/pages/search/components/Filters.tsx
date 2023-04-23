import { useTranslation } from "react-i18next";
import { Box, Select } from "@/ui-kit";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const countries = [
  {
    label: "Belarus",
    value: "Belarus",
  },
];

const cities = [
  {
    label: "Minsk",
    value: "Minsk",
  },
];

const Filters = () => {
  const { t } = useTranslation();
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const initUrl = `${location.pathname}${location.search}`;
    let newUrl = `${location.pathname}?search=${searchParams.get("search")}`;
    if (country) {
      newUrl += `&country=${country}`;
    }
    if (city) {
      newUrl += `&city=${city}`;
    }
    if (newUrl !== initUrl) {
      navigate(newUrl);
    }
  }, [city, country]);

  return (
    <Box>
      <Select
        label={t("Country")}
        value={country}
        onChange={setCountry}
        options={countries}
      />
      <Select
        label={t("City")}
        value={city}
        onChange={setCity}
        options={cities}
      />
    </Box>
  );
};

export default Filters;
