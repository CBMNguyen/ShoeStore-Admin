import ActionsButton from "components/ActionsButton";
import { STYLE_MODEL } from "constants/globals";
import { Badge } from "reactstrap";
import FormHeader from "../../../../components/FormHeader";
import "./reviewdeletemodel.scss";

function ReviewDeleteModel(props) {
  const { closeModel, data, onRemoveClick, loading } = props;

  return (
    <div className="ReviewDeleteModel animation-fade-in" style={STYLE_MODEL}>
      <div className="ReviewDeleteModel__main">
        <FormHeader closeModel={closeModel} />
        <div>
          {`Are you sure you want delete review of `}
          <Badge className="bg-danger">{`${data.userId.firstname} ${data.userId.lastname}`}</Badge>
          {` account ?`}
        </div>
        <ActionsButton
          loading={loading}
          data={data}
          onRemoveClick={onRemoveClick}
          onCloseModelClick={closeModel}
        />
      </div>
    </div>
  );
}

export default ReviewDeleteModel;
