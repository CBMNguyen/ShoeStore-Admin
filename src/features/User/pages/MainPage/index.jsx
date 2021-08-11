import Loading from "components/Loading";
import TableFooter from "components/TableFooter";
import TableHeader from "components/TableHeader";
import UserDeleteModel from "features/User/components/UserDeleteModel";
import UserList from "features/User/components/UserList";
import UserViewModel from "features/User/components/UserViewModel";
import { deleteUser, fetchUser } from "features/User/userSlice";
import useModel from "hooks/useModel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAge, showToastError, showToastSuccess } from "utils/common";

function MainPage(props) {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 12,

    name: "",
    age: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const userState = useSelector((state) => state.user);

  const users = userState.user;
  const { loading } = userState;

  const removeModel = useModel();
  const viewModel = useModel();

  // handle Pagination and filter equal redux

  const filterUsers = users.filter((user) => {
    return (
      user.firstname.toLowerCase().indexOf(filter["name"].toLowerCase()) !==
        -1 ||
      user.lastname.toLowerCase().indexOf(filter["name"].toLowerCase()) !== -1
    );
  });

  let sortUsers = filterUsers;

  // sort user increase age
  filter["age"] === 1 &&
    (sortUsers = filterUsers.sort(
      (a, b) => getAge(new Date(a.birthdate)) - getAge(new Date(b.birthdate))
    ));

  // sort user decrease age
  filter["age"] === -1 &&
    (sortUsers = filterUsers.sort(
      (a, b) => getAge(new Date(b.birthdate)) - getAge(new Date(a.birthdate))
    ));

  const start = (filter["page"] - 1) * filter["limit"];
  const end = filter["page"] * filter["limit"];

  // handle change pagiantion and filter
  const handleNameChange = (name) => {
    setFilter({ ...filter, page: 1, name });
  };

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const handleAgeChange = (age) => {
    setFilter({ ...filter, age });
  };

  const handleUserDelete = async (userId) => {
    try {
      await showToastSuccess(dispatch(deleteUser(userId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  return users.length === 0 ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <TableHeader
        filter={filter}
        name="User"
        onNameChange={handleNameChange}
        options={null}
        showModel={null}
      />

      <UserList
        filter={filter}
        users={sortUsers.slice(start, end)}
        onAgeChange={handleAgeChange}
        showRemoveModel={removeModel.showModel}
        showViewModel={viewModel.showModel}
      />

      <TableFooter
        filter={filter}
        totalRow={users.length}
        onPageChange={handlePageChange}
      />

      {removeModel.model.show && (
        <UserDeleteModel
          loading={loading}
          data={removeModel.model.data}
          onRemoveClick={handleUserDelete}
          closeModel={removeModel.closeModel}
        />
      )}

      {viewModel.model.show && (
        <UserViewModel
          data={viewModel.model.data}
          closeModel={viewModel.closeModel}
        />
      )}
    </div>
  );
}

export default withRouter(MainPage);
