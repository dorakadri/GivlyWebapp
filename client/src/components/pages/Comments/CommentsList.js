import { Box, Button, IconButton, Link, Typography } from "@material-ui/core";
import { Delete as DeleteIcon, Edit as EditIcon } from "@material-ui/icons";
import Moment from "react-moment";
import { deleteCommentAction } from "../../../ReduxB/slices/comments/commentSlices";
import { useDispatch, useSelector } from "react-redux";

export default function CommentsList({ comments }) {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  const isLoginuser = userAuth?._id;

  //dispatch
  const dispatch = useDispatch();

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={5}
        maxWidth={400}
      >
        <Typography variant="subtitle1" color="textSecondary">
          {comments?.length} Comments
        </Typography>
        {comments?.length <= 0 ? (
          <Typography variant="h6" color="textSecondary">
            No comments
          </Typography>
        ) : (
          comments?.map((comment) => (
            <Box
              key={comment?._id}
              py={4}
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <img
                  src={comment?.user?.profilePhoto}
                  alt=""
                  style={{ height: "2rem", width: "2rem", borderRadius: "50%" }}
                />
                <Link
                  to={`/profile/${comment?.user?._id}`}
                  style={{ marginLeft: "0.5rem" }}
                >
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    style={{ fontWeight: "bold" }}
                  >
                    {comment?.user?.firstName} {comment?.user?.lastName}
                  </Typography>
                </Link>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  style={{ marginLeft: "0.5rem" }}
                >
                  <Moment fromNow ago>
                    {comment?.createdAt}
                  </Moment>
                </Typography>
              </Box>
              <Typography variant="body2" color="textSecondary">
                {comment?.description}
              </Typography>
              {/* Check if is the same user created this comment */}
              {isLoginuser === comment?.user?._id ? (
                <Box display="flex" alignItems="center" mt={1}>
                 
                  <Button
                    onClick={() => dispatch(deleteCommentAction(comment?._id))}
                    startIcon={<DeleteIcon />}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </Box>
              ) : null}
            </Box>
          ))
        )}
      </Box>
    </div>
  );
}
