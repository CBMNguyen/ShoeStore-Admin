import Loading from "components/Loading";
import TableFooter from "components/TableFooter";
import TableHeader from "components/TableHeader";
import { PRODUCT_TOAST_OPTIONS } from "constants/globals";
import UserDeleteModel from "features/User/components/UserDeleteModel";
import UserList from "features/User/components/UserList";
import { deleteUser, fetchUser, updateUser } from "features/User/userSlice";
import useModel from "hooks/useModel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import { getAge, showToastError, showToastSuccess } from "utils/common";

function MainPage(props) {
  const initialFilter = {
    page: 1,
    limit: 12,
    name: "",
    age: 0,
  };

  const [filter, setFilter] = useState(initialFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const userState = useSelector((state) => state.user);

  const users = userState.user;
  const { loading } = userState;

  const removeModel = useModel();

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

  const handleResetFilter = () => {
    setFilter(initialFilter);
  };

  const handleUserDelete = async (userId) => {
    try {
      await showToastSuccess(dispatch(deleteUser(userId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleLockUserClick = async (data) => {
    try {
      await dispatch(updateUser({ userId: data._id, state: !data.state }));
      toast(
        `Successfully ${!data.state ? "locked" : "unlock"} ${data.firstname} ${
          data.lastname
        } account.`,
        { ...PRODUCT_TOAST_OPTIONS }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return loading && users.length === 0 ? (
    <Loading />
  ) : (
    <div className="MainPage">
      <TableHeader
        filter={filter}
        onResetFilter={handleResetFilter}
        name="User"
        onNameChange={handleNameChange}
        options={null}
        showModel={null}
      />

      <UserList
        loading={loading}
        filter={filter}
        users={sortUsers.slice(start, end)}
        onAgeChange={handleAgeChange}
        showRemoveModel={removeModel.showModel}
        onLockUserClick={handleLockUserClick}
      />

      <TableFooter
        filter={filter}
        totalRow={sortUsers.length}
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
    </div>
  );
}

export default withRouter(MainPage);
