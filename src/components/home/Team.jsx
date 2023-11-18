import { useEffect, useState } from "react";
import Heading from "../Heading";
import PropTypes from "prop-types";
import useContentful from "../../hooks/useContentful";
import Modal, { ModalTitle } from "../Modal";
import AnonymousIcon from "../../assets/anonymous.png";
import VoteIcon from "../../assets/vote.png";

const Member = ({ member, isEmpty }) => {
  if (isEmpty) {
    return (
      <div>
        <div className="mx-auto w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mb-3 relative max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none">
          <img src={AnonymousIcon} className="w-12" />
        </div>
        <div className="text-center font-bold text-sm whitespace-nowrap">
          Nicht nominiert
        </div>
      </div>
    );
  }
  return (
    <>
      {member.picture ? (
        <img
          src={member.picture}
          className="mx-auto rounded-full w-28 text-center relative mb-3 max-w-[100px] sm:max-w-none"
        />
      ) : (
        <div className="mx-auto w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mb-3 relative max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none">
          <img src={VoteIcon} className="w-12" />
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

const MIN_MEMBERS_TO_SHOW = 9;

function Team() {
  const [teamData, setTeamData] = useState();
  const [teamSection, setTeamSection] = useState("");
  const [modalContent, setModalContent] = useState();
  const { getMembers } = useContentful();

  useEffect(() => {
    const getTeamMembers = async () => {
      const data = await getMembers();
      setTeamData(data);
      setTeamSection(Object.keys(data)[0]);
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
        {member.picture ? (
          <img
            src={member.picture}
            className="float-left clear-left w-36 rounded-full pr-4 pb-4"
          />
        ) : (
          <div className="float-left clear-left w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mr-4">
            <img src={VoteIcon} className="w-16" />
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: member.text }}
          className="mt-8 text-sm sm:text-base"
        />
      </div>
    );
  };

  if (!teamData) {
    return null;
  }

  const hasMoreTeamSections = Object.keys(teamData)?.length > 1;

  return (
    <section
      id="team"
      className={`relative pb-5 px-2 md:px-10 ${
        hasMoreTeamSections
          ? "pt-20 md:pb-20 md:pt-24"
          : "pt-16 md:pb-16 md:pt-20"
      } bg-stone-900 -mx-4 sm:-mx-10 bg-[url('/bg_team_mobile.png')] sm:bg-[url('/bg_team.png')] bg-center bg-fixed bg-no-repeat`}
      style={{
        backgroundSize: "100% 100%",
      }}
    >
      {hasMoreTeamSections && (
        <div className="absolute px-1.5 sm:px-3 py-2 sm:p-3 top-0 right-0 text-sm">
          {Object.keys(teamData).map((key, index) => (
            <a
              className={`py-2 px-4 ${
                teamSection === key || (index === 0 && !teamSection)
                  ? "border-b-2 border-red-600"
                  : "text-stone-400"
              }`}
              onClick={() => setTeamSection(key)}
            >
              {key}
            </a>
          ))}
        </div>
      )}
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <div className="text-white text-center -mt-5">
        <Heading title="Amtierendes Team" />
      </div>
      <div className="overflow-x-auto overflow-y-hidden px-5 pt-3 pb-6 sm:py-6 scrollbar-transparent">
        <div className="flex items-start gap-x-3 sm:gap-x-5 gap-y-24 justify-start xl:justify-center min-w-[1200px] w-full">
          {teamData[teamSection]?.map((member) => (
            <div
              key={member.name}
              className="p-2 sm:p-3 relative bg-stone-200 rounded-md transform hover:scale-110 transition cursor-pointer flex-1 max-w-[150px]"
              onClick={() => handleReadMore(member)}
            >
              <Member member={member} />
            </div>
          ))}
          {teamData[teamSection]?.length &&
            teamData[teamSection].length < MIN_MEMBERS_TO_SHOW &&
            Array(
              ...Array(
                MIN_MEMBERS_TO_SHOW - teamData[teamSection]?.length
              ).keys()
            ).map((index) => {
              return (
                <div
                  key={`emptyMember${index}`}
                  className="p-2 sm:p-3 relative bg-stone-200 rounded-md transform hover:scale-110 transition flex-1 max-w-[150px] self-stretch opacity-80 flex items-center"
                >
                  <Member isEmpty={true} />
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Team;
