import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';

import NoteFeedEdit from './NoteFeedEdit';
import extractAvatar from '../../utils/managers';

import {
  section,
  projectNote,
  avatarContainer,
  avatar,
  contentContainer,
  noteContainer,
  noteHeader,
  starRating,
  noteBody,
  noteFooter,
  expanded,
  miniAvatarContainer,
  collapsed,
  editNoteBtn,
} from './Notes.module.scss';

const Note = ({ note, user, projectId, projectManagers }) => {
  const [expandedList, setExpandedList] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { topic, content, rating, attendedBy } = note;

  // Removes redundant avatar of signed-in user
  const displayedAttendees = attendedBy.filter(person => person.email !== user);

  return isEditing === false ? (
    <section className={projectNote}>
      <div className={avatarContainer}>
        <img
          src={extractAvatar(note.author.email)}
          alt={`avatar of ${note.author.name}`}
          className={avatar}
        />
      </div>
      <div className={noteContainer}>
        <div className={contentContainer}>
          <div className={noteHeader}>
            <h2>{topic}</h2>
            <StarRatings
              numberOfStars={3}
              rating={rating}
              className={starRating}
              starRatedColor="rgb(245,73,135)"
              starEmptyColor="rgba(245,73,135,.2)"
              starDimension="20px"
              starSpacing=".5px"
            />
          </div>
          <div className={noteBody}>{content}</div>
        </div>
        <div className={noteFooter}>
          <div
            className={expandedList ? expanded : collapsed}
            onClick={() => setExpandedList(!expandedList)}
            role="presentation"
          >
            {displayedAttendees.map(attendee => {
              return (
                <div className={miniAvatarContainer}>
                  <img
                    src={extractAvatar(attendee.email)}
                    alt={`avatar of ${attendee.name}`}
                  />
                  <p>{attendee.name}</p>
                </div>
              );
            })}
          </div>
          <button
            className={editNoteBtn}
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit
          </button>
        </div>
      </div>
    </section>
  ) : (
    <NoteFeedEdit
      id={note.id}
      note={note}
      user={user}
      projectId={projectId}
      projectManagers={projectManagers}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
    />
  );
};

export default Note;
