import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  // const handleSelectActivity = (id: string) => {
  //   setSelectedActivity(activities.find((x) => x.id === id));
  // };

  // const handleCancelSelectedActivity = () => {
  //   setSelectedActivity(undefined);
  // };

  // const handleFormOpen = (id?: string) => {
  //   id ? handleSelectActivity(id) : handleCancelSelectedActivity();
  //   setEditMode(true);
  // };

  // const handleFormClose = () => {
  //   setEditMode(false);
  // };

  // const handleCreateOrEditActivity = (activity: Activity) => {
  //   setSubmitting(true);
  //   if (activity.id) {
  //     agent.Activities.update(activity).then(() => {
  //       setActivities([
  //         ...activities.filter((x) => x.id !== activity.id),
  //         activity,
  //       ]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     });
  //   } else {
  //     activity.id = uuid();
  //     agent.Activities.create(activity).then(() => {
  //       setActivities([...activities, activity]);
  //       setSelectedActivity(activity);
  //       setEditMode(false);
  //       setSubmitting(false);
  //     });
  //   }
  // };

  // const handleDeleteActivity = (id: string) => {
  //   setSubmitting(true);
  //   agent.Activities.delete(id).then(() => {
  //     setActivities([...activities.filter((x) => x.id !== id)]);
  //     setSubmitting(false);
  //   });
  // };

  if (activityStore.loadingInitial)
    return <LoadingComponent content={"Loading Activities..."} />;

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard />
      </Container>
    </>
  );
}

export default observer(App);
