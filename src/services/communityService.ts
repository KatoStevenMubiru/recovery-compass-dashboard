import authService from "./authService";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface CommunityPost {
  id: number;
  user: number;
  user_anon_name: string;
  title: string;
  category: string;
  message: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  comments: CommunityComment[];
}

export interface CommunityComment {
  id: number;
  user: number;
  user_anon_name: string;
  post: number;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface SuccessStory {
  id: number;
  user: number;
  user_anon_name: string;
  title: string;
  story: string;
  tags: string;
  created_at: string;
  updated_at: string;
  like_count: number;
  bookmark_count: number;
}

export const communityService = {
  // Community Posts
  async getAllPosts(): Promise<CommunityPost[]> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/community-posts/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch posts");
    return response.json();
  },
  async createPost(data: {
    title: string;
    category: string;
    message: string;
  }): Promise<CommunityPost> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/community-posts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create post");
    return response.json();
  },
  async updatePost(
    id: number,
    data: Partial<{ title: string; category: string; message: string }>
  ): Promise<CommunityPost> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-posts/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to update post");
    return response.json();
  },
  async deletePost(id: number): Promise<void> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-posts/${id}/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to delete post");
  },
  async likePost(id: number): Promise<{ status: string; like_count: number }> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-posts/${id}/like/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to like post");
    return response.json();
  },
  async unlikePost(
    id: number
  ): Promise<{ status: string; like_count: number }> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-posts/${id}/unlike/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to unlike post");
    return response.json();
  },
  async getPost(id: number): Promise<CommunityPost> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-posts/${id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch post");
    return response.json();
  },

  // Community Comments
  async getAllComments(): Promise<CommunityComment[]> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/community-comments/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch comments");
    return response.json();
  },
  async createComment(data: {
    post: number;
    message: string;
  }): Promise<CommunityComment> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/community-comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create comment");
    return response.json();
  },
  async updateComment(
    id: number,
    data: { message: string }
  ): Promise<CommunityComment> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-comments/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to update comment");
    return response.json();
  },
  async deleteComment(id: number): Promise<void> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-comments/${id}/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to delete comment");
  },
  async getComment(id: number): Promise<CommunityComment> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/community-comments/${id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch comment");
    return response.json();
  },

  // Success Stories
  async getAllStories(): Promise<SuccessStory[]> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/success-stories/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch stories");
    return response.json();
  },
  async createStory(data: {
    title: string;
    story: string;
    tags: string;
  }): Promise<SuccessStory> {
    const token = authService.getAccessToken();
    const response = await fetch(`${API_URL}api/recovery/success-stories/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create story");
    return response.json();
  },
  async updateStory(
    id: number,
    data: Partial<{ title: string; story: string; tags: string }>
  ): Promise<SuccessStory> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/success-stories/${id}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) throw new Error("Failed to update story");
    return response.json();
  },
  async deleteStory(id: number): Promise<void> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/success-stories/${id}/`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to delete story");
  },
  async likeStory(id: number): Promise<{ status: string; like_count: number }> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/success-stories/${id}/like/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to like story");
    return response.json();
  },
  async unlikeStory(
    id: number
  ): Promise<{ status: string; like_count: number }> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/success-stories/${id}/unlike/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to unlike story");
    return response.json();
  },
  async bookmarkStory(
    id: number
  ): Promise<{ status: string; bookmark_count: number }> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/success-stories/${id}/bookmark/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to bookmark story");
    return response.json();
  },
  async unbookmarkStory(
    id: number
  ): Promise<{ status: string; bookmark_count: number }> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/success-stories/${id}/unbookmark/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to unbookmark story");
    return response.json();
  },
  async getStory(id: number): Promise<SuccessStory> {
    const token = authService.getAccessToken();
    const response = await fetch(
      `${API_URL}api/recovery/success-stories/${id}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) throw new Error("Failed to fetch story");
    return response.json();
  },
};
