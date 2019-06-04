#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Map Map;

struct Map{
	char* val1;
	char* val2;
};

Map* makeMap(char val1[],char val2[]){
  Map* tmp=calloc(1,sizeof(Map));

  tmp->val1=calloc(strlen(val1)+1,sizeof(char));
  strcpy(tmp->val1,val1);
  tmp->val1=calloc(strlen(val2)+1,sizeof(char));
  strcpy(tmp->val2,val2);

  return tmp;
}


typedef struct List List;

struct List{
	char* val;
	List* next;
};


List* makeList(char value[]){
  List* tmp=calloc(1,sizeof(List));
  tmp->val=calloc(strlen(value)+1,sizeof(char));
  strcpy(tmp->val,value);
  return tmp;
}



char* getIndex(List* ls,int index){
  for(int i=0;i<index;i++){
    if(ls->next!=NULL){
      ls=ls->next;
    }else{
      return NULL;
    }
  }
  if(ls->val!=NULL){
    return ls->val;
  }else{
    return NULL;
  }
}

int length(List* ls){
  int c=1;
  while(ls->next!=NULL){
    ls=ls->next;
    c++;
  }
  return c;
}




char* symbols[17]={"<->","->","<-","\n","\t","=","!=","&",">","<","+","-","*","/","(",")",":"};
List* state;
List* mappings;

List* tokens;


void parse(){
  List* tokensC=tokens;

  int c=getchar();
  char buffer='0';
  int ptr=0;
  while(c!=EOF){
    for(int i=0;i<17;i++){
      if(symbols[i][0]==c){//First Character Match
        if(symbols[i][1]!=NULL){
              buffer=c;
              c=getchar();

              if(symbols[i][1]==c){//Second Character Match
                if(symbols[i][2]!=NULL){
                      buffer=c;
                      c=getchar();
                      if(symbols[i][2]==c){//Second Character Match
                        c=buffer;
                        tokensC->val=symbols[i];
                        tokensC=tokensC->next;
                      }else{
                        c=buffer;
                      }
                }else{//Same 2 char
                  c=buffer;
                  tokensC->val=symbols[i];
                  tokensC=tokensC->next;
                }
              }


        }else{//Same 1 char
          tokensC->val=symbols[i];
          tokensC=tokensC->next;
        }
      }
    }
  }
}


int main(){
  state=makeList("head");
  tokens=makeList("head");
  printf("%i\n",length(state));

  return 0;
}
