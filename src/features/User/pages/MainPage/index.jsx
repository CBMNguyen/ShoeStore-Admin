import TableFooter from "components/TableFooter";
import TableHeader from "components/TableHeader";
import UserDeleteModel from "features/User/components/UserDeleteModel";
import UserList from "features/User/components/UserList";
import UserViewModel from "features/User/components/UserViewModel";
import { deleteUser, fetchUser } from "features/User/userSlice";
import useModel from "hooks/useModel";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showToastError, showToastSuccess } from "utils/common";

function MainPage(props) {
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    page: 1,
    name: "",
    age: 0,
  });

  useEffect(() => {
    dispatch(fetchUser(filter));
  }, [dispatch, filter]);

  const userState = useSelector((state) => state.user);
  const users = userState.user;
  const { loading, pagination } = userState;

  const removeModel = useModel();
  const viewModel = useModel();

  const handleUserDelete = async (userId) => {
    try {
      await showToastSuccess(dispatch(deleteUser(userId)));
      removeModel.closeModel();
      setFilter({ ...filter });
    } catch (error) {
      showToastError(error);
    }
  };

  const handleNameChange = (name) => {
    setFilter({ ...filter, page: 1, name });
  };

  const handlePageChange = (page) => {
    setFilter({ ...filter, page });
  };

  const handleAgeChange = (age) => {
    setFilter({ ...filter, age });
  };

  return (
    <div className="MainPage">
      <TableHeader
        showModel={null}
        name="User"
        onNameChange={handleNameChange}
        options={null}
      />

      <UserList
        users={users}
        age={filter.age}
        onAgeChange={handleAgeChange}
        showRemoveModel={removeModel.showModel}
        showViewModel={viewModel.showModel}
        pagination={pagination}
      />

      <TableFooter pagination={pagination} onPageChange={handlePageChange} />

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

export default MainPage;
