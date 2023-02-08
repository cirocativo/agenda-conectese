import { useEffect } from "react";

import { useContact } from "../../providers/Contacts";
import { PDFReport } from "../../components/PDFReport";
import { PDFDownload } from "../../components/PDFDownload";
import { useUser } from "../../providers/User";

const UserPdf = () => {
  const { refreshContactList, contactList } = useContact();
  const { user } = useUser();
  useEffect(() => {
    refreshContactList();
  }, []);

  return (
    <div className="flex flex-col-reverse sm:flex-row">
      <div className=" sm:w-1/6 min-[660px]:w-1/3 md:w-1/2"></div>
      <div className="flex justify-center mt-4 mb-10">
        {<PDFReport contactList={contactList} user={user} />}
      </div>
      <div className=" sm:w-1/2 flex justify-center">
        {
          <PDFDownload
            document={<PDFReport contactList={contactList} user={user} />}
          />
        }
      </div>{" "}
      ;
    </div>
  );
};

export default UserPdf;
