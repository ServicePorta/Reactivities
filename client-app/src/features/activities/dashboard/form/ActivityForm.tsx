import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/models/activity";

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEditActivity: (activity: Activity) => void;
}

const ActivityForm = ({ closeForm, activity: selectedActivity,createOrEditActivity }: Props) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    city: "",
    date: "",
    description: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleSubmit = () => {
    createOrEditActivity(activity);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement| HTMLTextAreaElement>) => {
    const {name,value}=event.target;
    setActivity({...activity,[name]:value})
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input placeholder="Title" name="title" value={activity.title} onChange={handleInputChange}  />
        <Form.TextArea placeholder="Description" name='description' value={activity.description} onChange={handleInputChange}   />
        <Form.Input placeholder="Category" name='category' value={activity.category} onChange={handleInputChange}   />
        <Form.Input placeholder="Date" name='date' value={activity.date} onChange={handleInputChange}   />
        <Form.Input placeholder="City" name='city' value={activity.city} onChange={handleInputChange}   />
        <Form.Input placeholder="Venue" name='venue' value={activity.venue} onChange={handleInputChange}   />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          onClick={closeForm}
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
