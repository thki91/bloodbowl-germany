import { useEffect, useState } from "react";
import Heading from "../Heading";
import PropTypes from "prop-types";
import useContentful from "../../hooks/useContentful";
import Modal, { ModalTitle } from "../Modal";
import AnonymousIcon from "../../assets/anonymous.png";

const Member = ({ member }) => {
  return (
    <>
      {member.picture ? (
        <img
          src={member.picture}
          className="mx-auto rounded-full w-28 text-center relative mb-3"
        />
      ) : (
        <div className="w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full">
          <img src={AnonymousIcon} className="w-16" />
        </div>
      )}

      {member.captain && (
        <div className="absolute top-2 bg-stone-100 border-2 border-amber-500 z-1 rounded-full w-8 h-8 text-md flex items-center justify-center">
          👑
        </div>
      )}
      <div className="text-center font-bold">{member.name}</div>
    </>
  );
};

Member.propTypes = {
  member: PropTypes.object,
};

function Team() {
  const [teamData, setTeamData] = useState();
  const [modalContent, setModalContent] = useState();
  const { getMembers } = useContentful();

  useEffect(() => {
    const getTeamMembers = async () => {
      const data = await getMembers();
      setTeamData(data);
    };
    getTeamMembers();
  }, []);

  const handleReadMore = (member) => {
    setModalContent(
      <div>
        <ModalTitle title={member.name} />
        {member.captain && (
          <div className="absolute top-14 bg-stone-100 border-2 border-amber-500 z-1 rounded-full w-8 h-8 text-md flex items-center justify-center">
            👑
          </div>
        )}
        <img
          src={member.picture}
          className="float-left clear-left w-36 rounded-full pr-4 pb-4"
        />
        <div
          dangerouslySetInnerHTML={{ __html: member.text }}
          className="mt-8"
        />
      </div>
    );
  };

  return (
    <section
      id="team"
      className="pt-12 pb-5 px-2 md:px-10 md:pt-24 md:pb-20 bg-stone-900 -mx-4 sm:-mx-10 overflow-hidden bg-[url('/bg_team_mobile.png')] sm:bg-[url('/bg_team.png')] bg-center bg-fixed bg-no-repeat"
      style={{
        backgroundSize: "100% 100%",
      }}
    >
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <div className="text-white text-center -mt-5">
        <Heading title="Amtierendes Team" />
      </div>
      <div className="overflow-x-auto overflow-y-hidden px-5 pt-3 pb-6 sm:py-6 scrollbar-transparent">
        <div className="flex items-start gap-x-3 sm:gap-x-5 gap-y-24 justify-center min-w-[1200px] w-full">
          {teamData?.map((member) => (
            <div
              key={member.name}
              className="p-2 sm:p-3 relative bg-stone-200 rounded-md transform hover:scale-110 transition cursor-pointer flex-1"
              onClick={() => handleReadMore(member)}
            >
              <Member member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
