import TableFooter from "components/TableFooter";
import {
  createRole,
  deleteRole,
  fetchRole,
  updateRole,
} from "features/Role/roleSlice";
import useModel from "hooks/useModel";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import {
  capitalizeFirstLetter,
  showToastError,
  showToastSuccess,
} from "utils/common";
import DeleteModel from "../../../Scc/components/DeleteModel";
import RoleModal from "../../components/RoleModal";
import "./mainpage.scss";

function MainPage(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRole());
  }, [dispatch]);

  const roleState = useSelector((state) => state.role);

  const roles = roleState.role;
  const { loading } = roleState;

  const addModel = useModel();
  const removeModel = useModel();

  const { closeModel, showModel, model } = addModel;

  const handleAddClick = () => {
    showModel();
  };

  const handleUpdateClick = (role) => {
    showModel(role);
  };

  const handleRemoveClick = async (role) => {
    removeModel.showModel(role);
  };

  const handleRoleRemove = async (roleId) => {
    try {
      await showToastSuccess(dispatch(deleteRole(roleId)));
      removeModel.closeModel();
    } catch (error) {
      showToastError(error);
    }
  };

  const handleFormSubmit = async (data) => {
    data.role = data.role.toLowerCase();
    if (!model.data) {
      try {
        await showToastSuccess(dispatch(createRole(data)));
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    } else {
      try {
        await showToastSuccess(
          await dispatch(
            updateRole({
              _id: model.data._id,
              role: data.role,
            })
          )
        );
        addModel.closeModel();
      } catch (error) {
        showToastError(error);
      }
    }
  };

  return (
    <div className="MainPage">
      <div className="MainPage__TableHeader">
        <div className="MainPage__add">
          <i onClick={handleAddClick} className="zmdi zmdi-plus-circle" />
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th className="ps-3 fw-bold">#</th>
            <th>Role Id</th>
            <th>Role Name</th>
            <th>Create At</th>
            <th>Update At</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {roles
            .slice()
            .sort((a, b) => a.role - b.role)
            .map((role, i) => (
              <tr
                key={role._id}
                style={{ verticalAlign: "middle", fontSize: "15px" }}
              >
                <th>
                  <code className="bg-secondary text-white px-2 py-1 rounded-2 fw-bold text-center">
                    {i + 1}
                  </code>
                </th>
                <th className="fw-normal">
                  <code
                    className="text-white fw-bold px-2 py-1 rounded-2"
                    style={{ backgroundColor: "cyan" }}
                  >
                    {role._id}
                  </code>
                </th>
                <td>
                  <code
                    className="text-white fw-bold px-2 py-1 rounded-2"
                    style={{ backgroundColor: "deeppink" }}
                  >
                    {capitalizeFirstLetter(role["role"])}
                  </code>
                </td>
                <td>
                  <code className="text-white fw-bold px-2 py-1 rounded-2 bg-secondary">
                    {role.createdAt}
                  </code>
                </td>
                <td>
                  <code className="text-white fw-bold px-2 py-1 rounded-2 bg-secondary">
                    {role.updatedAt}
                  </code>
                </td>
                <td width={100}>
                  <i
                    onClick={() => handleUpdateClick(role)}
                    className="zmdi zmdi-edit text-primary ps-3"
                  />
                  <i
                    onClick={() => handleRemoveClick(role)}
                    className="zmdi zmdi-delete text-danger ps-3"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <TableFooter
        filter={{ page: 1, limit: 8 }}
        totalRow={1}
        onPageChange={() => console.log("first")}
      />
      {model.show ? (
        <RoleModal
          loading={loading}
          onSubmit={handleFormSubmit}
          closeModel={closeModel}
          model={model}
        />
      ) : null}

      {removeModel.model.show ? (
        <DeleteModel
          name="role"
          loading={loading}
          data={removeModel.model.data}
          closeModel={removeModel.closeModel}
          onRemoveClick={handleRoleRemove}
        />
      ) : null}
    </div>
  );
}

export default MainPage;
