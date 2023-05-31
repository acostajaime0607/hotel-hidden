import React from "react";
import Page from "../Page";

const NotFoundView = () => {
  return (
    <Page title="404">
      <div
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <div maxWidth="md">
          <p align="center" color="textPrimary" variant="h1">
            404: La página que estas buscando no esta aquí.
          </p>
          <p align="center" color="textPrimary" variant="subtitle2">
            Si entraste por error aqui, por favor intenta usar la navegación.
          </p>
          <div textAlign="center">
            <img
              alt="Under development"
              style={{
                marginTop: 50,
                display: "inline-block",
                maxWidth: "100%",
                width: 560,
              }}
              src="/static/images/undraw_page_not_found_su7k.svg"
            />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default NotFoundView;
