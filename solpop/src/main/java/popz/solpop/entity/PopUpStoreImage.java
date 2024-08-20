package popz.solpop.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Setter
@Getter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class PopUpStoreImage {

  @Id
  private long popUpImageNo;
  private String popUpStoreNo;


}
