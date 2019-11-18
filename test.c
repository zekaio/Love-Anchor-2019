#include <stdio.h>
int main()
{
   // printf() 中字符串需要引号
   printf("Hello, World!");
   char buf[10];
    sprintf(buf, "The length of the string is more than 10");
    printf("%s", buf);
   return 0;
}