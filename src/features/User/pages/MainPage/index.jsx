import UserDeleteModel from "features/User/components/UserDeleteModel";
import UserList from "features/User/components/UserList";
import UserViewModel from "features/User/components/UserViewModel";
import { deleteUser, fetchUser } from "features/User/userSlice";
import useModel from "hooks/useModel";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function MainPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const users = useSelector((state) => state.user.user);

  const removeModel = useModel();
  const viewModel = useModel();

  const handleUserDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="MainPage">
      <UserList
        users={users}
        showRemoveModel={removeModel.showModel}
        showViewModel={viewModel.showModel}
      />

      {removeModel.model.show && (
        <UserDeleteModel
          onDeleteClick={handleUserDelete}
          data={removeModel.model.data}
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
