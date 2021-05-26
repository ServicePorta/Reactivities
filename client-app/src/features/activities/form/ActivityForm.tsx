import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useHistory, useParams } from "react-router";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import { Activity } from "../../../app/models/activity";

const ActivityForm = () => {
  const history = useHistory();

  const { activityStore } = useStore();

  const {
    createActivity,
    updateActivity,
    loading,
    loadActivity,
    loadingInitial,
  } = activityStore;

  const { id } = useParams<{ id: string }>();

  const [activity, setActivity] = useState<Activity>({
    id: "",
    title: "",
    category: "",
    city: "",
    date: null,
    description: "",
    venue: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("The activity title is required"),
    description: Yup.string().required("The activity description is required"),
    category: Yup.string().required(),
    date: Yup.string().required().nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  });

  useEffect(() => {
    if (id) loadActivity(id).then((activity) => setActivity(activity!));
  }, [id, loadActivity]);

  const handleFormSubmit = (activity: Activity) => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity).then(() => {
        history.push(`/activities/${newActivity.id}`);
      });
    } else {
      updateActivity(activity).then(() => {
        history.push(`/activities/${activity.id}`);
      });
    }
  };

  if (loadingInitial)
    return <LoadingComponent content={"Loading activity..."} />;

  return (
    <Segment clearing>
      <Header sub content="Activity Details" color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={activity}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, dirty, isSubmitting }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput name={"title"} placeholder={"Title"} />
            <MyTextArea
              rows={3}
              name={"description"}
              placeholder={"Description"}
            />
            <MySelectInput
              options={categoryOptions}
              name={"category"}
              placeholder={"Category"}
            />
            <MyDateInput
              name={"date"}
              placeholderText={"Date"}
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <Header sub content="Location Details" color="teal" />

            <MyTextInput name={"city"} placeholder={"City"} />
            <MyTextInput name={"venue"} placeholder={"Venue"} />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to={"/activities"}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>

      {/* without formik */}
      {/* <Field
              placeholder="Title"
              name="title"
              value={activity.title}
              onChange={handleInputChange}
            />
            <Form.TextArea
              placeholder="Description"
              name="description"
              value={activity.description}
              onChange={handleInputChange}
            />
            <Field
              placeholder="Category"
              name="category"
              value={activity.category}
              onChange={handleInputChange}
            />
            <Field
              type="date"
              placeholder="Date"
              name="date"
              value={activity.date}
              onChange={handleInputChange}
            />
            <Field
              placeholder="City"
              name="city"
              value={activity.city}
              onChange={handleInputChange}
            />
            <Field
              placeholder="Venue"
              name="venue"
              value={activity.venue}
              onChange={handleInputChange}
            />
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to={"/activities"}
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form> */}
    </Segment>
  );
};

export default observer(ActivityForm);
