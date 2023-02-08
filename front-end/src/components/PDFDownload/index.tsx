import { PDFDownloadLink } from "@react-pdf/renderer";
import { ReactElement } from "react";

interface IPDFDownload {
  document: ReactElement;
}

export const PDFDownload = ({ document }: IPDFDownload) => {
  return (
    <PDFDownloadLink
      document={document}
      fileName="report.pdf"
      className="my-button my-button-red-style w-40 mt-4 sm:mt-10"
    >
      {({ blob, url, loading, error }) =>
        loading ? "Processando..." : "Baixe Agora!"
      }
    </PDFDownloadLink>
  );
};
