import React, { useEffect, useState } from 'react';
import { List, Avatar } from 'antd';
import axios from 'axios';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      email: string;
      date: string;
    };
  };
  author: {
    avatar_url: string;
  };
}

const CommitsPage: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>([]);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await axios.get<Commit[]>(
          'https://api.github.com/repos/YuzeTT/small-sticker/commits'
        );
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commits:', error);
      }
    };

    fetchCommits();
  }, []);

  return (
    <List
      size="large"
      header={<div>更新历史(数据来自Github Commit历史)</div>}
      footer={<div>仅展示最近30条</div>}
      dataSource={commits}
      bordered
      renderItem={(commit) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={commit.author.avatar_url} />}
            title={commit.commit.message}
            description={`Committed by ${commit.commit.author.name} on ${commit.commit.author.date}`}
          />
        </List.Item>
      )}
    />
  );
};

export default CommitsPage;