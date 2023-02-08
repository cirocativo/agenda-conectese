import { Page, Text, View, Document } from "@react-pdf/renderer";
import { IUserProps, useUser } from "../../providers/User";
import { IContactProps, useContact } from "../../providers/Contacts";
import { styles } from "./styles";

interface IPDFReport {
  contactList: IContactProps[];
  user: IUserProps | null;
}

export const PDFReport = ({ contactList, user }: IPDFReport) => {
  return (
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
};
