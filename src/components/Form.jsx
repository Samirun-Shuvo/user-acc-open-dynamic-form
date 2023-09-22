import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UserSelect from "./UserSelect.jsx";

const Form = () => {
  const { register, handleSubmit } = useForm();
  const [users, setUsers] = useState([]);
  const [userSelectCount, setUserSelectCount] = useState(1);
  const [usersFromSelect, setUsersFromSelect] = useState([]);
  const [usersFromSelectDisabled, setUsersFromSelectDisabled] = useState([]);
  const [rt, setRT] = useState([]);
  const [rtc, setRTc] = useState(false);

  const onSubmit = (values) => {
    values.userIds = [];

    usersFromSelect.forEach((userFromSelect) => {
      const valueIdx = values.userIds.findIndex(
        (value) => value.userId === userFromSelect.user.id,
      );

      if (valueIdx === -1)
        values.userIds.push({ userId: userFromSelect.user.id });
    });

    console.log(values);
  };

  const handleUsersFromSelect = (targetSelect, userId) => {
    const targetSelectIdx = usersFromSelect.findIndex(
      (item) => item.targetSelect === targetSelect,
    );
    const user = users.find((user) => user.id === userId);

    if (targetSelectIdx !== -1) {
      const arr = usersFromSelect;

      arr.splice(targetSelectIdx, 1, { targetSelect, user });
      setUsersFromSelect([...arr]);
    } else {
      setUsersFromSelect([...usersFromSelect, { targetSelect, user }]);
    }

    setRTc(!rtc)
  };

  const handleUsersFromSelectDisabled = (targetSelect, userId) => {
    const targetSelectIdx = usersFromSelectDisabled.findIndex(
        (item) => item.targetSelect === targetSelect,
    );

    if (targetSelectIdx !== -1) {
      const arr = usersFromSelectDisabled;

      arr.splice(targetSelectIdx, 1, { targetSelect, userId });
      setUsersFromSelectDisabled([...arr]);
    } else {
      setUsersFromSelectDisabled([...usersFromSelectDisabled, { targetSelect, userId }]);
    }
  };

  useEffect(() => {
    fetch(`/users.json`)
      .then((response) => response.json())
      .then((result) => setUsers(result));
  }, []);

  useEffect(() => {
    if (usersFromSelectDisabled.length) {
      const r = usersFromSelectDisabled.map(userFromSelectDisabled => userFromSelectDisabled.userId)
      const tt = Array.from(new Set(r))
      setRT(tt)
    }
  }, [rtc]);
console.log(rt)
  return (
    <section className={`py-10`}>
      <div className="container">
        <form
          className={`grid grid-cols-1 gap-5`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Branch"
            className={`input input-sm input-bordered focus:outline-none`}
            {...register("branch")}
            required
          />
          <input
            type="text"
            placeholder="Location"
            className={`input input-sm input-bordered focus:outline-none`}
            {...register("location")}
            required
          />
          {[...Array(userSelectCount)].map((_, idx) => (
            <UserSelect
              key={idx}
              targetSelect={idx}
              handleUsersFromSelect={handleUsersFromSelect}
              handleUsersFromSelectDisabled={handleUsersFromSelectDisabled}
              usersFromSelect={usersFromSelect}
              usersFromSelectDisabled={usersFromSelectDisabled}
              users={users}
              rt={rt}
            />
          ))}
          <div className={`text-center mt-5`}>
            <button
              type="button"
              className={`btn btn-sm normal-case`}
              onClick={() => setUserSelectCount((prev) => ++prev)}
            >
              Add More
            </button>
          </div>
          <button type="submit" className={`btn btn-sm`}>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default Form;
