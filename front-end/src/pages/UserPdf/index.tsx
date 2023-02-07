import React, { useEffect } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";
import { useUser } from "../../providers/User";
import { useContact } from "../../providers/Contacts";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 0,
    width: "50vw",
    minWidth: "365px",
    // justifyContent: "flex-start",
    backgroundColor: "#E4E4E4",
  },
  header: {
    paddingTop: 15,
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  clientName: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  clientInfo: {
    fontSize: 14,
    paddingTop: 5,
  },
  contactH2: {
    fontSize: 22,
    marginBottom: 5,
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },
  contactName: {
    fontSize: 18,
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 14,
    paddingTop: 5,
  },
  contactDate: {
    fontSize: 12,
    paddingTop: 5,
    color: "rgba(0, 0, 0, 0.6)",
  },
});

const UserPdf = () => {
  const { user } = useUser();
  const { contactList, refreshContactList } = useContact();
  useEffect(() => {
    refreshContactList();
  }, []);

  const pdf = () => (
    <Document>
      <Page size="A4" style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.contactH2}>Relatório de Contatos ConecteSe</Text>
        </View>
        <View style={styles.header}>
          <Text style={styles.clientName}>{user?.name}</Text>
          <Text style={styles.clientInfo}>{user?.email}</Text>
          <Text style={styles.clientInfo}>{user?.phone}</Text>
        </View>

        <View style={styles.contactList}>
          <View>
            <Text style={styles.contactH2}>Contatos</Text>
          </View>

          {contactList.map((contact) => (
            <View key={contact.id} style={styles.contactList}>
              <Text style={styles.contactName}>Nome: {contact.name}</Text>
              <Text style={styles.contactInfo}>E-mail: {contact.email}</Text>
              <Text style={styles.contactInfo}>Telefone: {contact.phone}</Text>
              <Text style={styles.contactDate}>
                Criado em: {contact.createdAt}
              </Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );

  function createLink() {
    return (
      <PDFDownloadLink
        document={pdf()}
        fileName="report.pdf"
        className="my-button my-button-red-style w-40 mt-4 sm:mt-10"
      >
        {({ blob, url, loading, error }) =>
          loading ? "Processando..." : "Baixe Agora!"
        }
      </PDFDownloadLink>
    );
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row">
      <div className=" sm:w-1/6 min-[660px]:w-1/3 md:w-1/2"></div>
      <div className="flex justify-center mt-4 mb-10">{pdf()}</div>
      <div className=" sm:w-1/2 flex justify-center">{createLink()}</div> ;
    </div>
  );
};

export default UserPdf;
