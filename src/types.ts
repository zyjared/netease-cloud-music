export type SubViews = {
  user: {
    uid: number;
  };
  playlist: {
    id: number;
  };
  comment: {
    id: number | string;
    commentType: "event" | "playlist" | "song";
    data?: any;
  };
};

export type ToViewName = keyof SubViews;

export type ToView<T extends ToViewName> = {
  toview: T;
  params: SubViews[T];
};

export type ToUser = ToView<"user">;
export type ToPlaylist = ToView<"playlist">;
export type ToComment = ToView<"comment">;