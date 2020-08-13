import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import Step from "../components/Step";

const StepList = ({ goal }) => {
    const steps = useSelector((state) => state.goals.steps);
    const loadingSteps = useSelector((state) => state.goals.loadingSteps);
    return (
        <>
            {loadingSteps ? (
                <Loading />
            ) : (
                <FlatList
                    keyExtractor={(item) => item.id.toString()}
                    data={steps}
                    renderItem={(itemData) => (
                        <Step step={itemData.item} goal={goal} />
                    )}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({});

export default StepList;
