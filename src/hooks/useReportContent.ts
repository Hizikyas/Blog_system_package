import { useBlogContext } from '../context/BlogContext';
import { CreateReportData } from '../types';

export function useReportContent() {
  const { supabaseClient } = useBlogContext();

  const reportContent = async (reportData: CreateReportData) => {
    try {
      const userIP = await fetch('/api/get-ip').then(res => res.json()).catch(() => null);

      const { error } = await supabaseClient
        .from('reports')
        .insert({
          ...reportData,
          reporter_ip: userIP?.ip
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error reporting content:', error);
      throw error;
    }
  };

  return { reportContent };
}
