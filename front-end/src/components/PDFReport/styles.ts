import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
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
