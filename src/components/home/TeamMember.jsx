import PropTypes from "prop-types";

const TeamMember = ({ member, isEmpty }) => {
  if (isEmpty) {
    return (
      <>
        <div className="flex-shrink-0 mx-auto w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mb-3 relative max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none">
          <div
            className="w-full h-full rounded-full overflow-hidden flex-shrink-0 bg-cover bg-no-repeat bg-center"
            style={{ backgroundImage: `url('/member_unknown.png')` }}
          />
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
            style={{ backgroundImage: `url('${member.picture}?w=200')` }}
          />
        </div>
      ) : (
        <div className="mx-auto w-28 h-28 bg-stone-800 flex items-center justify-center rounded-full mb-3 relative max-w-[100px] sm:max-w-none max-h-[100px] sm:max-h-none">
          <img src={VoteIcon} className="w-12" />
        </div>
      )}
      {member.role && (
        <div className="absolute top-3 bg-stone-100 border-2 border-amber-500 z-1 rounded-full w-8 h-8 text-md flex items-center justify-center">
          {member.role}
        </div>
      )}
      <div className="text-sm text-center font-bold">{member.name}</div>
    </>
  );
};

TeamMember.propTypes = {
  member: PropTypes.object,
  isEmpty: PropTypes.bool,
};

export default TeamMember;
