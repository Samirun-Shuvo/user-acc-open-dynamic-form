import React, { useEffect, useState } from "react";

const UserSelect = ({
  targetSelect,
  handleUsersFromSelect,
  handleUsersFromSelectDisabled,
  usersFromSelect,
                        usersFromSelectDisabled,
  users,
    rt
}) => {
  const [idx, setIdx] = useState(null);

  useEffect(() => {
    if (usersFromSelect.length) {
      const userFromSelectIdx = usersFromSelect.findIndex(
        (userFromSelect) => userFromSelect.targetSelect === targetSelect,
      );

      if (userFromSelectIdx !== -1) setIdx(userFromSelectIdx);
    }
  }, [handleUsersFromSelect]);

    // useEffect(() => {
    //     if (usersFromSelectDisabled.length) {
    //         const test =Array.from(new Set(usersFromSelectDisabled.map(userFromSelectDisabled => userFromSelectDisabled.userId)))
    //         // setRT(test)
    //
    //     }
    // }, [handleUsersFromSelectDisabled]);

  return (
    <div className={`grid grid-cols-4 gap-5`}>
      <select
        className={`select select-sm select-bordered focus:outline-none`}
        onChange={(e) => {
            handleUsersFromSelect(targetSelect, +e.target.value)
            handleUsersFromSelectDisabled(targetSelect, +e.target.value)
        }}
      >
        <option defaultValue="" selected disabled>
          Select user id
        </option>
        {users.map((user) => (
          <option key={user.id} defaultValue={user.id} disabled={rt.includes(user.id)}>
            {user.id}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Name"
        className={`input input-sm input-bordered focus:outline-none`}
        defaultValue={usersFromSelect[idx]?.user.name}
        readOnly
        disabled
      />
      <input
        type="text"
        placeholder="Town"
        className={`input input-sm input-bordered focus:outline-none`}
        defaultValue={usersFromSelect[idx]?.user.town}
        readOnly
        disabled
      />
      <input
        type="text"
        placeholder="City"
        className={`input input-sm input-bordered focus:outline-none`}
        defaultValue={usersFromSelect[idx]?.user.city}
        readOnly
        disabled
      />
    </div>
  );
};

export default UserSelect;
