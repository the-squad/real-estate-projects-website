﻿$(window).ready(function () {
    $("#add-user").click(function () {
        showForm("signup-form");
    });
    //Deleting current user
    $(".delete-user-btn").click(function () {
        var rowParent = $(this).parent().parent().parent();
        var userId = $(rowParent).attr("id");
        $.post("/profile/deleteUser", {
            id: userId,
        }, function () {
            showSnackbar("User deleted.");
            rowParent.remove();
        });
    });

    //Approve post
    $(".approve-project-btn").click(function () {
        var projectContainer = $(this).parent().parent().parent().parent();
        var selectedProjectId = $(projectContainer).attr("id");
        $.post("/profile/approveProject", {
            projectId: selectedProjectId,
        }, function () {
            showSnackbar("Project approved");
            $(projectContainer).remove();
        });
    });

    //Decline Post
    $(".decline-project-btn").click(function () {
        var projectContainer = $(this).parent().parent().parent().parent();
        var selectedProjectId = $(projectContainer).attr("id");
        $.post("/profile/declineProject", {
            projectID: selectedProjectId,
        }, function () {
            showSnackbar("Project declined");
            $(projectContainer).remove();
        });
    });

    //Accept Request
    $(".accept-invitation-btn").click(function () {
        var requestContainer = $(this).parent().parent();
        var selectedRequestId = $(requestContainer).attr("id");
        $.post("/profile/acceptRequest", {
            requestID: selectedRequestId,
        }, function () {
            showSnackbar("Request Accepted");
            $(requestContainer).remove();
        });
    });

    //Decline Request
    $(".decline-invitation-btn").click(function () {
        var requestContainer = $(this).parent().parent();
        var selectedRequestId = $(requestContainer).attr("id");
        $.post("/profile/deleteRequest", {
            requestID: selectedRequestId,
        }, function () {
            showSnackbar("Request Decline");
            $(requestContainer).remove();
        });
    });

    //Accept Request PM
    $(".accept-request-btn").click(function () {
        var applyContainer = $(this).parent().parent().parent();
        var pmId = $(applyContainer).attr("id");
        var projectId = $(applyContainer).attr("project-id");
        $.post("/profile/Customer_assignProjectToPM", {
            PM_ID: pmId,
            projectID: projectId
        }, function () {
            showSnackbar("Request Accepted");
            $(applyContainer).remove();
            //$(applyContainer).attr("project-id");
        });
    });

    //decline Request PM
    $(".decline-request-btn").click(function () {
        var applyContainer = $(this).parent().parent().parent();
        var pmId = $(applyContainer).attr("id");
        var projectId = $(applyContainer).attr("project-id");
        $.post("/profile/declineApplyer", {
            PM_ID: pmId,
            projectID: projectId
        }, function () {
            showSnackbar("Request Declined");
            $(applyContainer).remove();
        });
    });

    //leave project
    $(".leave-project-btn").click(function () {
        var applyContainer = $(this).parent().parent().parent().parent();
        var projectId = $(applyContainer).attr("id");
        $.post("/profile/leaveProject", {
            projectId: projectId
        }, function () {
            showSnackbar("Leaved Success");
            $(applyContainer).remove();
        });
    });

    //Remove team leader
    $(".remove-leader").parent().click(function () {
        var projectID = $(this).attr("project-id");
        var image = $(this).find("img")[0]
        var imageContainer = $(this);

        $.post("/profile/Te_LeaveProject", {
            projectId: projectID
        }, function () {
            $(imageContainer).removeClass("removable");
            $(image).attr("src", "/Public/assets/images/default-user.jpg");
            $(image).removeClass("remove-leader");
            showSnackbar("Successfully removed team leader");
        });
    });

    //Remove team member
    $(".remove-engineer").parent().click(function () {
        var projectID = $(this).attr("project-id");
        var memberID = $(this).attr("user-id");
        var image = $(this).find("img")[0]
        var imageContainer = $(this);

        $.post("/profile/Je_LeaveProject", {
            JE_ID : memberID,
            projectId: projectID
        }, function () {
            $(imageContainer).remove();
            showSnackbar("Successfully removed junior engineer");
        });
    });

    //Invite to porject
    $(".invite-to-project").click(function () {
        var selectedProjectId = $("#project").attr("selected-id");
        var userId = $(this).parent().parent().attr("id");
        $.post("/profile/request", {
            projectId: selectedProjectId,
            userId: userId
        }, function (result) {
            if (result == "True")
                showSnackbar("Successfully Invited");
            else
                showSnackbar("Already Invited");
        });
    });
});