// 定义返回的数据类型
export interface responseData<T = any> {
  code: number;
  msg: string;
  data: T;
}
