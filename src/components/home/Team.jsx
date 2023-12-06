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
      <>
        <div className="flex-shrink-0 mx-auto w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mb-3 relative max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none">
          <img src={AnonymousIcon} className="w-12" />
        </div>
        <div className="text-center font-bold text-sm whitespace-nowrap">
          Nicht nominiert
        </div>
      </>
    );
  }
  return (
    <>
      {member.picture ? (
        <div className="flex-shrink-0 mx-auto rounded-full text-center relative mb-3 w-28 h-28 max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none overflow-hidden flex items-center">
          <div
            className="w-full h-full rounded-full overflow-hidden flex-shrink-0 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('${member.picture}')` }}
          />
        </div>
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
      <div className="text-sm text-center font-bold">{member.name}</div>
    </>
  );
};

Member.propTypes = {
  member: PropTypes.object,
};

const MIN_MEMBERS_TO_SHOW = {
  Eurobowl: 9,
  "Eur'Open": 4,
};

function Team() {
  const [teamData, setTeamData] = useState();
  const [teamSection, setTeamSection] = useState("Eurobowl");
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
        {member.picture ? (
          <div className="float-left clear-left w-32 h-32 overflow-hidden mr-2 flex items-center mt-[10px] sm:mt-0">
            <div
              className="w-full h-full rounded-full overflow-hidden mr-5 md:mr-4 flex-shrink-0 bg-cover bg-no-repeat bg-center"
              style={{ backgroundImage: `url('${member.picture}')` }}
            />
          </div>
        ) : (
          <div className="float-left clear-left w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mr-4 mt-[10px] sm:mt-0">
            <img src={VoteIcon} className="w-16" />
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: member.text }}
          className="mt-8 text-sm md:text-base"
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
      className={`relative pb-8 px-2 md:px-10 pt-16 md:pb-16 md:pt-20 bg-stone-900 -mx-4 sm:-mx-10 bg-[url('/bg_team_mobile.png')] sm:bg-[url('/bg_team.png')] bg-center bg-fixed bg-no-repeat`}
      style={{
        backgroundSize: "100% 100%",
      }}
    >
      <Modal show={!!modalContent} handleClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
      <div className="text-white text-center -mt-5">
        <Heading title={`Aktuelles Team`} />
        {hasMoreTeamSections && (
          <div className="pb-4 text-sm -mt-3">
            {["Eurobowl", "Eur'Open"].map((key, index) => (
              <a
                className={`py-2 px-4 ${
                  teamSection === key || (index === 0 && !teamSection)
                    ? "border-b-2 border-red-600 !text-stone-100 hover:!text-white"
                    : "text-stone-100 hover:!text-white opacity-90"
                }`}
                onClick={() => setTeamSection(key)}
              >
                {key}
              </a>
            ))}
          </div>
        )}
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
            teamData[teamSection].length < MIN_MEMBERS_TO_SHOW[teamSection] &&
            Array(
              ...Array(
                MIN_MEMBERS_TO_SHOW[teamSection] - teamData[teamSection]?.length
              ).keys()
            ).map((index) => {
              return (
                <div
                  key={`emptyMember${index}`}
                  className="p-2 sm:p-3 relative bg-stone-200 rounded-md flex-1 max-w-[140px] self-stretch opacity-80"
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
